import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Switch, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

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
    <View style={styles.toggleButtonContainer}>
      <Switch value={!!state[0]} onValueChange={_onToggleSwitch} />
      <Text>
        <Icon name={state[0] ? 'moon' : 'sun'} size={24} />
      </Text>
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
