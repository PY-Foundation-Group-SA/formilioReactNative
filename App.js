import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {View, Text} from 'react-native';

const App: () => React$Node = () => {
  return (
    <View>
      <Text>Lamo</Text>
    </View>
  );
};

export default () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};
