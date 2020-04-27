import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// importing screens
import SplashScreen from './src/screens/SplashScreen';
import UserStartingScreen from './src/screens/UserStartingScreen';
import HomeScreen from './src/screens/HomeScreen';

const UserStartingSwitch = createSwitchNavigator(
  {
    SplashScreen,
    UserStartingScreen,
    HomeScreen,
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(UserStartingSwitch);
