/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

// importing apiHelpers
import {getAllForms} from '../../utils/apiHelpers';

// importing styles
import styles from './styles';

class HomeScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      formList: [],
    };
  }

  componentDidMount() {
    const {state} = this.context;
    if (!state.apiUrl && !state.token) {
      this.props.navigation.navigate('UserStartingScreen');
      return;
    }
    getAllForms(state.apiUrl, state.token)
      .then((formList) => {
        console.log(formList);
        this.setFormList(formList);
        this.setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        this.setIsLoading(false);
      });
  }

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

  render() {
    const theme = this.context.state.theme;
    const {isLoading} = this.state;

    if (isLoading) {
      return (
        <View
          style={[
            styles.userStartingContainer,
            {
              backgroundColor: theme ? 'black' : 'white',
            },
          ]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <Text>Loaded</Text>
      </View>
    );
  }
}

export default HomeScreen;
