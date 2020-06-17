/* eslint-disable react-native/no-inline-styles */
import React, {Component, useContext} from 'react';
import {View, FlatList, Alert, BackHandler, StyleSheet} from 'react-native';
import {
  ActivityIndicator,
  Searchbar,
  Card,
  Avatar,
  IconButton,
  Subheading,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

// importing component
import Fab from '../../components/Fab';

// importing apiHelpers
import {getAllForms, getValidate, deleteForm} from '../../utils/apiHelpers';

// importing styles
import styles from './styles';
import Animated, {
  useCode,
  cond,
  eq,
  add,
  set,
  min,
  abs,
  divide,
} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  usePanGestureHandler,
  useValue,
  timing,
  snapPoint,
  useClock,
} from 'react-native-redash';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SwipeAction = ({x}) => {
  const {theme} = useContext(UserContext);
  const size = divide(x, 100);
  const translateFromRight = divide(x, -4);

  return (
    <AnimatedIcon
      style={{
        transform: [{scale: size}, {translateX: translateFromRight}],
      }}
      name="trash-2"
      size={50}
      color={theme ? 'white' : 'black'}
    />
  );
};

const ListItem = ({item, navigation, onSwipe}) => {
  const snapPoints = [-100, 0];
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const translateX = useValue(0);
  const offSetX = useValue(0);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, snapPoints);

  useCode(() => [
    cond(
      eq(state, State.ACTIVE),
      set(translateX, add(offSetX, min(translation.x, 0))),
    ),
    cond(eq(state, State.END), [
      set(translateX, timing({clock, from: translateX, to})),
      set(offSetX, translateX),
    ]),
  ]);

  return (
    <Animated.View>
      <View
        style={[
          {
            ...StyleSheet.absoluteFill,
            backgroundColor: 'red',
            borderRadius: 8,
          },
          styles.Card,
        ]}>
        <TouchableRipple
          onPress={() => onSwipe()}
          style={[
            StyleSheet.absoluteFill,
            {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 0,
            },
          ]}>
          <SwipeAction x={abs(translateX)} />
        </TouchableRipple>
      </View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{height: 100, transform: [{translateX}]}}>
          <Card style={[StyleSheet.absoluteFill, styles.Card]} elevation={4}>
            <TouchableRipple
              onPress={() =>
                navigation.navigate('FormViewScreen', {
                  fid: item._id,
                })
              }
              style={StyleSheet.absoluteFill}>
              <Card.Title
                title={item.formName}
                subtitle={item.description}
                left={({size}) => (
                  <Avatar.Text
                    size={size}
                    label={item.formName.split(' ')[0][0].toUpperCase()}
                  />
                )}
                right={({size}) => (
                  <IconButton
                    size={size}
                    animated={true}
                    icon={({color}) => (
                      <Icon size={size} name="arrow-right" color={color} />
                    )}
                    onPress={() =>
                      navigation.navigate('FormViewScreen', {
                        fid: item._id,
                      })
                    }
                  />
                )}
              />
            </TouchableRipple>
          </Card>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

class HomeScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      formList: [],
      isListRefreshing: false,
      search: '',
      isOnSearch: false,
    };
    this.validatorNames = [];
    this.formList = [];
  }

  componentDidMount() {
    const {state} = this.context;
    if (!state.token) {
      this.props.navigation.navigate('UserStartingScreen');
      return;
    } else {
      this.fetchFormsFromDatabase();
    }
    this.props.navigation.addListener('focus', () => {
      this.fetchFormsFromDatabase();
    });
  }

  fetchFormsFromDatabase = async () => {
    const {state} = this.context;
    try {
      const [formList, v] = await Promise.all([
        getAllForms(state.token),
        getValidate(state.token),
      ]);
      if (formList === false || v === []) {
        return;
      }
      this.validatorNames = v;
      this.formList = formList;
      this.setFormList(formList);
      this.setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      if (err.message === 'Network request failed') {
        Alert.alert(
          'Error',
          'Oops! Looks like your net connection is down. Unfortunately, we need it to function correctly :(',
          [
            {text: 'Retry', onPress: () => this.fetchFormsFromDatabase()},
            {text: 'Exit', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert('Error', err.message, [{text: 'Ok'}]);
      }
      this.setIsLoading(false);
    }
  };

  setIsLoading = (bool) => {
    this.setState({
      isLoading: bool,
    });
  };

  setFormList = (list) => {
    this.setState({
      formList: list,
    });
  };

  setSearchText = (search) => {
    if (search !== '') {
      const newFormList = this.formList.filter((form, index) => {
        return form.formName.includes(search);
      });
      this.setState({
        formList: newFormList,
        search: search,
      });
      return;
    }
    this.setState({
      formList: this.formList,
      search: '',
    });
  };

  whichSearchIcon = () => {
    const {isOnSearch, search} = this.state;
    if (isOnSearch) {
      return 'search';
    }
    if (search !== '') {
      return 'search';
    }
    return 'menu';
  };

  onIconPress = () => {
    const {isOnSearch} = this.state;
    if (isOnSearch) {
      return null;
    }
    this.props.navigation.openDrawer();
  };

  onSwipe = async (fid, i) => {
    const {state} = this.context;
    Alert.alert(
      'Delete Form',
      'Your are about to delete a form. All response collected through that form will be deleted!',
      [
        {text: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const isDeleted = await deleteForm(state.token, fid);
              if (!isDeleted) {
                throw new Error('Unable to delete form!');
              }
              this.fetchFormsFromDatabase();
            } catch (err) {
              console.log(err);
              Alert.alert('Delete Form', err.message, [
                {text: 'cancel'},
                {text: 'Retry', onPress: () => this.deleteFormHandler()},
              ]);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  renderListItem = ({item, index}) => {
    return (
      <ListItem
        item={item}
        navigation={this.props.navigation}
        onSwipe={() => this.onSwipe(item._id, index)}
      />
    );
  };

  ListEmptyComponent = (theme) => {
    const {isLoading, search} = this.state;

    if (isLoading) {
      return (
        <View
          style={[
            styles.homeScreenLoaderContainer,
            {
              backgroundColor: theme ? 'black' : 'white',
            },
          ]}>
          <ActivityIndicator />
        </View>
      );
    }

    if (search !== '') {
      <View
        style={[
          styles.homeScreenLoaderContainer,
          {
            backgroundColor: theme ? 'black' : 'white',
          },
        ]}>
        <Subheading style={{textAlign: 'center'}}>Form not found</Subheading>
      </View>;
    }

    return (
      <View
        style={[
          styles.homeScreenLoaderContainer,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme ? 'black' : 'white',
            marginTop: -80,
          },
        ]}>
        <Icon
          size={40}
          name="info"
          color={theme ? 'white' : 'black'}
          style={{marginVertical: 20}}
        />
        <Subheading style={{textAlign: 'center'}}>
          Start With Creating Your First Form
        </Subheading>
      </View>
    );
  };

  onRefresh = async () => {
    this.setState({isListRefreshing: true});
    await this.fetchFormsFromDatabase();
    this.setState({isListRefreshing: false});
  };

  render() {
    const theme = this.context.state.theme;
    const {search, formList, isListRefreshing} = this.state;

    return (
      <>
        <View
          style={[
            styles.homeScreenMainContainer,
            {
              backgroundColor: theme ? 'black' : 'white',
            },
          ]}>
          <Searchbar
            onFocus={() => this.setState({isOnSearch: true})}
            onEndEditing={() => this.setState({isOnSearch: false})}
            icon={(props) => <Icon {...props} name={this.whichSearchIcon()} />}
            onIconPress={() => this.onIconPress()}
            clear={(props) => <Icon {...props} name="x" />}
            style={styles.searchContainer}
            placeholder="Search for form"
            onChangeText={(s) => this.setSearchText(s)}
            value={search}
          />
          <FlatList
            style={styles.flatList}
            data={formList}
            keyExtractor={(item) => item._id}
            renderItem={this.renderListItem}
            ListEmptyComponent={this.ListEmptyComponent(theme)}
            refreshing={isListRefreshing}
            onRefresh={this.onRefresh}
          />
          <Fab
            onAddForm={() => this.props.navigation.navigate('AddFormScreen')}
          />
        </View>
      </>
    );
  }
}

export default HomeScreen;
