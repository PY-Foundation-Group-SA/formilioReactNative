import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Switch} from 'react-native-paper';

// importing components
import DarkModeToggleSwitch from '../../components/DarkModeToggleSwitch';

// importing styles
import styles from './styles';

class UserStartingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.userStartingContainer}>
        <Text>This is User Starting Screen</Text>
        <DarkModeToggleSwitch />
      </View>
    );
  }
}

export default UserStartingScreen;
