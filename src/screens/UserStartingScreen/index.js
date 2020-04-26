/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Headline, TextInput, Button} from 'react-native-paper';

// importing contexts
import {Context as ThemeContext} from '../../contexts/ThemeContext';

// importing components
import DarkModeToggleSwitch from '../../components/DarkModeToggleSwitch';

// importing styles
import styles from './styles';

class UserStartingScreen extends Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: '',
    };
  }

  componentDidMount() {
    console.log('Dark Theme Enabled: ', this.context.state[0]);
  }

  setApiUrl = (apiUrl) => {
    this.setState({
      apiUrl,
    });
  };

  onPress = () => {
    console.log('Button Pressed');
  };

  render() {
    const theme = this.context.state[0];
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
            label="Api Url"
            value={this.state.apiUrl}
            onChangeText={(apiUrl) => this.setApiUrl(apiUrl)}
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
