import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const {Value} = Animated;

const SplashScreen = (props) => {
  const start = useRef(new Value(0)).current;

  useEffect(() => {
    start.setValue(0);
    Animated.timing(start, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(start, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        props.navigation.navigate('UserStartingScreen');
      });
    });
  }, [props.navigation, start]);

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
