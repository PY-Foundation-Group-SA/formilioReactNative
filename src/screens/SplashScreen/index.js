/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useContext} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

// importing asyncHelpers
import {getData} from '../../utils/asyncStorageHelper';

const {Value} = Animated;

const SplashScreen = (props) => {
  const {state, addToken, addApiUrl, enableDarkTheme} = useContext(UserContext);
  const animationStart = useRef(new Value(0)).current;

  useEffect(() => {
    animationStart.setValue(0);
    async function fetchFromAsyncStorage() {
      const [token, apiUrl, theme] = await Promise.all([
        getData('TOKEN'),
        getData('API_URL'),
        getData('THEME'),
      ]);
      // setting a theme
      theme === 'true' ? enableDarkTheme() : null;
      if (apiUrl && token) {
        await Promise.all([addToken(token), addApiUrl(apiUrl)]);
        props.navigation.navigate('HomeScreen');
        return;
      }
      props.navigation.navigate('UserStartingScreen');
    }
    Animated.timing(animationStart, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      fetchFromAsyncStorage();
      Animated.timing(animationStart, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    });
  }, [
    props.navigation,
    animationStart,
    state,
    addApiUrl,
    addToken,
    enableDarkTheme,
  ]);

  return (
    <View style={styles.viewStyles}>
      <Animated.Text
        style={{opacity: animationStart, color: 'white', fontSize: 30}}>
        Formilio
      </Animated.Text>
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
