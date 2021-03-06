/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Context as UserContext} from './src/contexts/UserContext';
import DrawerContent from './src/components/DrawerContent/index';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// importing screens
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
      <Stack.Screen
        options={{
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            animation: 'spring',
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
        name="FormViewScreen"
        component={FormViewScreen}
      />
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
        openByDefault={false}
        drawerStyle={{
          backgroundColor: state.theme ? 'rgba(35, 35, 35, 1)' : 'white',
        }}
        drawerContent={(props) => (
          <DrawerContent {...props} theme={state.theme} logOut={logOut} />
        )}
        sceneContainerStyle={{
          backgroundColor: state.theme ? 'rgba(35, 35, 35, 1)' : 'white',
        }}
        initialRouteName="FormStackNavigator"
        backBehavior="initialRoute"
        drawerType="slide"
        headerMode="none"
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
    UserStartingScreen,
    MainAppDrawer,
  },
  {
    initialRouteName: 'UserStartingScreen',
  },
);

export default createAppContainer(UserStartingSwitch);
