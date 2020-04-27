/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {
  Provider as UserProvider,
  Context as UserContext,
} from './src/contexts/UserContext';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <UserProvider>
      <UserContext>
        {(value) => {
          const isDarkModeOn = value.state.theme;
          return (
            <PaperProvider
              theme={isDarkModeOn ? DarkTheme : DefaultTheme}
              settings={{
                icon: (props) => <Icon {...props} size={24} />,
              }}>
              <App theme={isDarkModeOn ? 'dark' : 'light'} />
            </PaperProvider>
          );
        }}
      </UserContext>
    </UserProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
