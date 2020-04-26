import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Switch} from 'react-native-paper';

// importing context for theme preference
import {Context as ThemeContext} from '../../contexts/ThemeContext';

const DarkModeToggleSwitch = () => {
  const {state, enableDarkTheme, disableDarkTheme} = useContext(ThemeContext);

  const _onToggleSwitch = () => {
    if (state[0]) {
      disableDarkTheme();
    } else {
      enableDarkTheme();
    }
  };

  return (
    <>
      <Switch value={!!state[0]} onValueChange={_onToggleSwitch} />
    </>
  );
};

export default DarkModeToggleSwitch;
