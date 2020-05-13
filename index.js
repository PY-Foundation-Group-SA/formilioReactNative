/**
 * @format
 */
import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  Provider as UserProvider,
  Context as UserContext,
} from './src/contexts/UserContext';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {(value) => {
          const isDarkModeOn = value.state.theme;
          return (
            <PaperProvider theme={isDarkModeOn ? DarkTheme : DefaultTheme}>
              <StatusBar
                translucent={true}
                hidden={true}
                animated={true}
                backgroundColor={isDarkModeOn ? 'black' : 'white'}
                barStyle={isDarkModeOn ? 'light-content' : 'dark-content'}
              />
              <App theme={isDarkModeOn ? 'dark' : 'light'} />
            </PaperProvider>
          );
        }}
      </UserContext.Consumer>
    </UserProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
