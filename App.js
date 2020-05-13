/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Context as UserContext} from './src/contexts/UserContext';
import DrawerContent from './src/components/DrawerContent/index';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// importing screens
import SplashScreen from './src/screens/SplashScreen';
import UserStartingScreen from './src/screens/UserStartingScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddFormScreen from './src/screens/AddFormScreen';
import FormViewScreen from './src/screens/FormViewScreen';

const Stack = createStackNavigator();

function FormStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      headerMode="none"
      keyboardHandlingEnabled={true}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FormViewScreen" component={FormViewScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MainAppDrawer(props) {
  const {state, removeToken} = useContext(UserContext);

  const logOut = async () => {
    await removeToken();
    return props.navigation.navigate('UserStartingScreen');
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: state.theme ? 'rgba(35, 35, 35, 1)' : 'white',
        }}
        drawerContent={(props) => (
          <DrawerContent {...props} theme={state.theme} logOut={logOut} />
        )}
        initialRouteName="FormStackNavigator"
        backBehavior="initialRoute"
        openByDefault={false}
        drawerPosition="left"
        drawerType="slide"
        edgeWidth={200}
        keyboardDismissMode="on-drag"
        minSwipeDistance={100}
        lazy={false}>
        <Drawer.Screen
          name="FormStackNavigator"
          component={FormStackNavigator}
        />
        <Drawer.Screen name="AddFormScreen" component={AddFormScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const UserStartingSwitch = createSwitchNavigator(
  {
    SplashScreen,
    UserStartingScreen,
    MainAppDrawer,
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(UserStartingSwitch);
