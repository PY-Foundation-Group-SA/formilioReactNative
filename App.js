import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// importing screens
import SplashScreen from './src/screens/SplashScreen';
import UserStartingScreen from './src/screens/UserStartingScreen';

const UserStartingSwitch = createSwitchNavigator(
  {
    SplashScreen,
    UserStartingScreen,
  },
  {
    initialRouteName: 'UserStartingScreen',
  },
);

export default createAppContainer(UserStartingSwitch);
