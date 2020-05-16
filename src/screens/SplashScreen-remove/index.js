/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

const SplashScreen = (props) => {
  const {state, addToken, enableDarkTheme} = useContext(UserContext);

  useEffect(() => {
    async function fetchFromAsyncStorage() {
      const [token, theme] = await Promise.all([
        getData('TOKEN'),
        getData('THEME'),
      ]);
      // setting a theme
      theme === 'true' ? enableDarkTheme() : null;
      if (token) {
        await addToken(token);
        props.navigation.navigate('MainAppDrawer');
        return;
      }
      props.navigation.navigate('UserStartingScreen');
    }
    fetchFromAsyncStorage();
  }, [props.navigation, state, addToken, enableDarkTheme]);

  return (
    <View style={styles.viewStyles}>
      <Text
        style={{opacity: 1, color: 'white', fontSize: 30, marginVertical: 40}}>
        Formilio
      </Text>
      <ActivityIndicator />
      <Text style={{color: 'white', position: 'absolute', bottom: 20}}>
        Made with ♥ in React Native
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export default SplashScreen;
