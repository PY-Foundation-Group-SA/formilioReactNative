/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing context for theme preference
import {Context as UserContext} from '../../contexts/UserContext';

const {width} = Dimensions.get('window');

const DarkModeToggleSwitch = () => {
  const animateStart = useRef(new Animated.Value(0)).current;
  const rotateData = animateStart.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const {state, enableDarkTheme, disableDarkTheme} = useContext(UserContext);

  const _onToggleSwitch = () => {
    animateStart.setValue(0);
    Animated.timing(animateStart, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    if (state.theme) {
      disableDarkTheme();
    } else {
      enableDarkTheme();
    }
  };

  return (
    <View style={styles.toggleButtonContainer}>
      <Switch value={state.theme} onValueChange={_onToggleSwitch} />
      <Animated.Text
        style={{
          color: state.theme ? 'white' : 'black',
          transform: [{rotate: rotateData}],
        }}>
        <Icon name={state.theme ? 'moon' : 'sun'} size={width * 0.06} />
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DarkModeToggleSwitch;
