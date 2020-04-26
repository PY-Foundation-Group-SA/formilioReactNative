/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Headline,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native-paper';

// importing contexts
import {Context as UserContext} from '../../contexts/UserContext';

// importing components
import DarkModeToggleSwitch from '../../components/DarkModeToggleSwitch';

// importing styles
import styles from './styles';

class UserStartingScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: '',
      header: '',
      isLoading: false,
    };
  }

  setApiUrl = (apiUrl) => {
    this.setState({
      apiUrl,
    });
  };

  setHeader = (header) => {
    this.setState({
      header,
    });
  };

  onPress = () => {
    console.log('Button Pressed');
    this.setState({
      isLoading: true,
    });
  };

  render() {
    const theme = this.context.state.theme;
    const {isLoading, apiUrl, header} = this.state;

    if (isLoading) {
      return (
        <View
          style={[
            styles.userStartingContainer,
            {
              backgroundColor: theme ? 'black' : 'white',
            },
          ]}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    return (
      <View
        style={[
          styles.userStartingContainer,
          {
            backgroundColor: theme ? 'black' : 'white',
          },
        ]}>
        <Headline>Enter Your Server URL</Headline>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Your Url"
            value={apiUrl}
            onChangeText={(apiUrl) => this.setApiUrl(apiUrl)}
          />
          <TextInput
            mode="outlined"
            label="Your Secret"
            value={header}
            onChangeText={(header) => this.setHeader(header)}
            style={{
              marginTop: 5,
            }}
          />
        </View>
        <View>
          <Button mode="contained" loading={false} onPress={this.onPress}>
            Connect Server
          </Button>
        </View>
        <View style={styles.modeToggleContainer}>
          <DarkModeToggleSwitch />
        </View>
      </View>
    );
  }
}

export default UserStartingScreen;
