/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity, Alert} from 'react-native';
import {
  ActivityIndicator,
  Text,
  Searchbar,
  Divider,
  List,
} from 'react-native-paper';

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
    };
    this.validatorNames = [];
    this.formList = [];
  }

  componentDidMount() {
    const {state} = this.context;
    if (!state.apiUrl && !state.token) {
      this.props.navigation.navigate('UserStartingScreen');
      return;
    } else {
      this.fetchFormsFromDatabase();
    }
    this.props.navigation.addListener('willFocus', () => {
      this.fetchFormsFromDatabase();
    });
  }

  fetchFormsFromDatabase = async () => {
    const {state} = this.context;
    Promise.all([
      getAllForms(state.apiUrl, state.token),
      getValidate(state.apiUrl, state.token),
    ])
      .then((results) => {
        const formList = results[0];
        const v = results[1];
        if (formList === false || v === []) {
          return;
        }
        this.validatorNames = v;
        this.formList = formList;
        this.setFormList(formList);
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

  renderList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('FormViewScreen', {
            form: item,
          })
        }>
        <List.Item
          title={item.formName}
          description={
            item.description.length > 40
              ? item.description.slice(0, 40) + '...'
              : item.description
          }
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
      </TouchableOpacity>
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
            backgroundColor: theme ? 'black' : 'white',
          },
        ]}>
        <Text>Create A Form</Text>
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
      <View
        style={[
          styles.homeScreenMainContainer,
          {
            backgroundColor: theme ? 'black' : 'white',
          },
        ]}>
        <Searchbar
          placeholder="Search for form"
          onChangeText={(s) => this.setSearchText(s)}
          value={search}
        />
        <FlatList
          style={{alignSelf: 'stretch'}}
          data={formList}
          keyExtractor={(item, index) => item.formName}
          renderItem={this.renderList}
          ItemSeparatorComponent={() => <Divider />}
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
    );
  }
}

export default HomeScreen;
