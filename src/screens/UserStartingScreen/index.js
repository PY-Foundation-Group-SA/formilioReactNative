import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Switch} from 'react-native-paper';

import {Context as ThemeContext} from '../../contexts/ThemeContext';

// importing styles
import styles from './styles';

class UserStartingScreen extends Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);

    this.state = {
      isSwitchOn: false,
    };
  }

  componentDidMount() {
    const themeContext = this.context;
    console.log(themeContext);
  }

  _onToggleSwitch = () => {
    const {isSwitchOn} = this.state;
    const {enableDarkTheme, disableDarkTheme} = this.context;
    if (isSwitchOn) {
      disableDarkTheme();
    } else {
      enableDarkTheme();
    }
    this.setState({
      isSwitchOn: !isSwitchOn,
    });
  };

  render() {
    const {isSwitchOn} = this.state;

    return (
      <View style={styles.userStartingContainer}>
        <Text>This is User Starting Screen</Text>
        <Switch value={isSwitchOn} onValueChange={this._onToggleSwitch} />
      </View>
    );
  }
}

export default UserStartingScreen;
