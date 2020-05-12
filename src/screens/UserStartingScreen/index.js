/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import {
  Headline,
  TextInput,
  Button,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';

// importing contexts
import {Context as UserContext} from '../../contexts/UserContext';

// importing components
import DarkModeToggleSwitch from '../../components/DarkModeToggleSwitch';

// importing utils
import {connectServer} from '../../utils/apiHelpers';

// importing styles
import styles from './styles';

const {width, height} = Dimensions.get('window');

class UserStartingScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      snack: false,
      snackText: '',
      isOnLogin: true,
    };

    this.onStartAnimation = new Animated.Value(0);
    this.screenLoadingOpacity = this.onStartAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    this.headerTransition = this.onStartAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-height / 2, 0],
    });
    this.buttonTransition = this.onStartAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [height / 2, 0],
    });
  }

  componentDidMount() {
    Animated.timing(this.onStartAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  setEmail = (email) => {
    this.setState({
      email,
    });
  };

  setPassword = (password) => {
    this.setState({
      password,
    });
  };

  setIsLoading = (bool) => {
    this.setState({
      isLoading: bool,
    });
  };

  toggleScreen = () => {
    const {isOnLogin} = this.state;
    Animated.timing(this.onStartAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        isOnLogin: !isOnLogin,
      });
      Animated.timing(this.onStartAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  onLogin = async () => {
    const {email, password} = this.state;
    const {addToken, addApiUrl} = this.context;
    let resp;
    try {
      resp = await connectServer(email, password);
    } catch (err) {
      console.log(err);
      resp = {
        statusCode: 9,
        error: err.message,
      };
    } finally {
      if (resp.statusCode !== 1) {
        return this.setState({
          isLoading: false,
          snack: true,
          snackText: resp.error,
        });
      }
      await addToken(resp.token);
      await addApiUrl(email);
      return this.props.navigation.navigate('HomeScreen');
    }
  }

  onPress = async () => {
    const {isOnLogin} = this.state;
    this.setIsLoading(true);

    if (isOnLogin) {
      this.onLogin();
    } else {
      console.log('Sign Up clicked');
    }
  };

  render() {
    const theme = this.context.state.theme;
    const {isLoading, isOnLogin, email, password} = this.state;

    if (isLoading) {
      return (
        <View
          style={[
            styles.userStartingContainer,
            {
              backgroundColor: theme ? 'black' : 'white',
            },
          ]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <>
        <Animated.View
          style={[
            styles.userStartingContainer,
            {
              backgroundColor: theme ? 'black' : 'white',
            },
          ]}>
          <Button
            style={[
              styles.screenSwitcherStarting,
              {
                opacity: this.screenLoadingOpacity,
              },
            ]}
            onPress={() => this.toggleScreen()}>
            {isOnLogin ? 'Sign Up' : 'Login'}
          </Button>
          <Animated.View
            style={{
              opacity: this.screenLoadingOpacity,
              transform: [{translateY: this.headerTransition}],
            }}>
            <Headline>
              {isOnLogin ? 'Login To Formilio' : 'Join Formilio'}
            </Headline>
          </Animated.View>
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: this.screenLoadingOpacity,
              },
            ]}>
            <TextInput
              mode="outlined"
              label="Email Id"
              value={email}
              onChangeText={(a) => this.setEmail(a)}
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={(h) => this.setPassword(h)}
              style={{
                marginTop: 10,
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              transform: [{translateY: this.buttonTransition}],
            }}>
            <Button mode="contained" loading={false} onPress={this.onPress}>
              {isOnLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Animated.View>
          <View style={styles.modeToggleContainer}>
            <DarkModeToggleSwitch />
          </View>
        </Animated.View>
        <Snackbar
          style={{alignItems: 'center'}}
          duration={Snackbar.DURATION_SHORT}
          visible={this.state.snack}
          onDismiss={() => this.setState({snack: false})}>
          {this.state.snackText}
        </Snackbar>
      </>
    );
  }
}

export default UserStartingScreen;
