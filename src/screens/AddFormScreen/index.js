import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

// importing styles
import styles from './styles';

class AddFormScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>This is Add Form Screen</Text>
      </View>
    );
  }
}

export default AddFormScreen;
