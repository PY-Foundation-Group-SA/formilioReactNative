import React, {useRef, useEffect, useContext} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

// importing asyncHelpers
import {getData} from '../../utils/asyncStorageHelper';

const {Value} = Animated;

const SplashScreen = (props) => {
  const {state, addToken, addApiUrl} = useContext(UserContext);
  const start = useRef(new Value(0)).current;

  useEffect(() => {
    start.setValue(0);
    Animated.timing(start, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(async () => {
      const [token, apiUrl] = await Promise.all([
        getData('TOKEN'),
        getData('API_URL'),
      ]);
      if (apiUrl && token) {
        await Promise.all([addToken(token), addApiUrl(apiUrl)]);
      }
      Animated.timing(start, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        if (state.token && state.apiUrl) {
          props.navigation.navigate('HomeScreen');
        } else {
          props.navigation.navigate('UserStartingScreen');
        }
      });
    });
  }, [props.navigation, start, state, addApiUrl, addToken]);

  return (
    <View style={styles.viewStyles}>
      <Animated.Image
        source={require('../../../assets/loadingLogo.png')}
        style={{opacity: start}}
      />
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
