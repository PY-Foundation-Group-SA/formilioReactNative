/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Headline,
  TextInput,
  Button,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';

// importing contexts
import {Context as UserContext} from '../../contexts/UserContext';

// importing components
import DarkModeToggleSwitch from '../../components/DarkModeToggleSwitch';

// importing utils
import {connectServer} from '../../utils/apiHelpers';

// importing styles
import styles from './styles';

class UserStartingScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: 'https://formilio-backend.herokuapp.com/',
      header: 'ThisIsLiverpool',
      isLoading: false,
      snack: false,
      snackText: '',
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

  setIsLoading = (bool) => {
    this.setState({
      isLoading: bool,
    });
  };

  onPress = async () => {
    const {apiUrl, header} = this.state;
    const {addToken, addApiUrl} = this.context;
    this.setIsLoading(true);

    try {
      const token = await connectServer(apiUrl, header);
      if (!token) {
        this.setState({
          isLoading: false,
          snack: true,
          snackText: 'Could not connect to server!',
        });
        return;
      }
      await addToken(token);
      await addApiUrl(apiUrl);
      this.props.navigation.navigate('HomeScreen');
    } catch (err) {
      this.setState({
        isLoading: false,
        snack: true,
        snackText: 'Could not connect to server!',
      });
    }
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
          <ActivityIndicator />
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
            onChangeText={(a) => this.setApiUrl(a)}
          />
          <TextInput
            mode="outlined"
            label="Your Secret"
            value={header}
            onChangeText={(h) => this.setHeader(h)}
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
        <Snackbar
          style={{alignItems: 'center'}}
          duration={Snackbar.DURATION_SHORT}
          visible={this.state.snack}
          onDismiss={() => this.setState({snack: false})}>
          {this.state.snackText}
        </Snackbar>
      </View>
    );
  }
}

export default UserStartingScreen;
