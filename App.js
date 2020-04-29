import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// importing screens
import SplashScreen from './src/screens/SplashScreen';
import UserStartingScreen from './src/screens/UserStartingScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddFormScreen from './src/screens/AddFormScreen';
import FormViewScreen from './src/screens/FormViewScreen';

const mainAppStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Formilio',
      },
    },
    AddFormScreen: {
      screen: AddFormScreen,
      navigationOptions: {
        title: 'Add Form',
      },
    },
    FormViewScreen: {
      screen: FormViewScreen,
      navigationOptions: {
        title: '',
      },
    },
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      animationEnabled: false,
      animationTypeForReplace: 'pop',
    },
  },
);

const UserStartingSwitch = createSwitchNavigator(
  {
    SplashScreen,
    UserStartingScreen,
    mainAppStack,
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(UserStartingSwitch);
