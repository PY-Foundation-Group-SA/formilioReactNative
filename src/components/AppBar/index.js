/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Appbar, DefaultTheme, DarkTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const AppBar = (props) => {
  const {downloadHandler, deleteFormHandler, goBack, theme} = props;
  return (
    <View
      theme={theme ? DarkTheme.colors.primary : DefaultTheme.colors.primary}
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme
          ? DarkTheme.colors.primary
          : DefaultTheme.colors.primary,
      }}>
      <Appbar.Action
        icon={({size}) => (
          <Icon
            name="arrow-left"
            size={size}
            color={theme ? 'white' : 'black'}
          />
        )}
        onPress={() => goBack()}
      />
      {/* <Appbar.BackAction onPress={() => goBack()} /> */}
      <Appbar.Content title="" />
      <Appbar.Action
        icon={({size}) => (
          <Icon name="download" size={size} color={theme ? 'white' : 'black'} />
        )}
        onPress={() => downloadHandler()}
      />
      <Appbar.Action
        icon={({size}) => (
          <Icon name="trash-2" size={size} color={theme ? 'white' : 'black'} />
        )}
        onPress={() => deleteFormHandler()}
      />
    </View>
  );
};

export default AppBar;
