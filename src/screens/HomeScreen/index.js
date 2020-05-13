/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, FlatList, Alert} from 'react-native';
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
import {getAllForms, getValidate} from '../../utils/apiHelpers';

// importing styles
import styles from './styles';

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
    Promise.all([getAllForms(state.token), getValidate(state.token)])
      .then(([formList, v]) => {
        if (formList === false || v === []) {
          return;
        }
        this.validatorNames = v;
        this.formList = formList;
        this.setFormList(formList);
        this.setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert(
          'Server Error',
          'Could not fetch form/validation details from the server!',
          [{text: 'Ok'}],
          {cancelable: true},
        );
      });
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

  renderList = ({item}) => {
    return (
      <Card style={styles.Card} elevation={4}>
        <TouchableRipple
          onPress={() =>
            this.props.navigation.navigate('FormViewScreen', {
              fid: item._id,
            })
          }>
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
                icon={() => <Icon size={24} name="hexagon" />}
                onPress={() => {}}
              />
            )}
          />
        </TouchableRipple>
      </Card>
    );
  };

  ListEmptyComponent = (theme) => {
    const {isLoading} = this.state;

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
            keyExtractor={(item) => item.formName}
            renderItem={this.renderList}
            ListEmptyComponent={this.ListEmptyComponent(theme)}
            refreshing={isListRefreshing}
            onRefresh={this.onRefresh}
          />
          <Fab
            navigation={this.props.navigation}
            onAddForm={() =>
              this.props.navigation.navigate('AddFormScreen', {
                validatorNames: this.validatorNames,
              })
            }
          />
        </View>
      </>
    );
  }
}

export default HomeScreen;
