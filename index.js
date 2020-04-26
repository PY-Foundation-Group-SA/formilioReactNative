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
import {
  Context as ThemeContext,
  Provider as ThemeProvider,
} from './src/contexts/ThemeContext';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <ThemeProvider>
      <ThemeContext>
        {(value) => {
          const isDarkModeOn = value.state[0];
          return (
            <PaperProvider theme={isDarkModeOn ? DarkTheme : DefaultTheme}>
              <App theme={isDarkModeOn ? 'dark' : 'light'} />
            </PaperProvider>
          );
        }}
      </ThemeContext>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
