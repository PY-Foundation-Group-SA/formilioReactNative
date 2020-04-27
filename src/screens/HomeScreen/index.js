/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

// importing styles
import styles from './styles';

class HomeScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log(this.context);
  }

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
  }
}

export default HomeScreen;
