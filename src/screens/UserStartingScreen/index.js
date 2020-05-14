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
import validator from 'validator';

// importing contexts
import {Context as UserContext} from '../../contexts/UserContext';

// importing components
import DarkModeToggleSwitch from '../../components/DarkModeToggleSwitch';

// importing utils
import {loginUser, signUpUser} from '../../utils/apiHelpers';

// importing styles
import styles from './styles';

const {height} = Dimensions.get('window');

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

    this.emailRef = null;
    this.passwordRef = null;

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
    this.animateScreenIn();
  }

  animateScreenIn = () => {
    Animated.timing(this.onStartAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  setEmail = (email) => {
    this.setState({
      email,
    });
  };

  setPassword = (password) => {
    if (password.length > 40) {
      return;
    }
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
    const {addToken} = this.context;
    let resp;
    try {
      resp = await loginUser(email.toLowerCase(), password);
    } catch (err) {
      console.log(err);
      resp = {
        statusCode: 9,
        error: err.message,
      };
    } finally {
      this.animateScreenIn();
      if (resp.statusCode !== 1) {
        return this.setState({
          isLoading: false,
          snack: true,
          snackText: resp.error ? resp.error : 'User account not found!',
        });
      }
      if (!resp.payload.user.isEmailVerified) {
        return this.setState({
          isLoading: false,
          snack: true,
          snackText: resp.error ? resp.error : 'Please verify your email first',
        });
      }
      await addToken(resp.payload.signInToken);
      return this.props.navigation.navigate('MainAppDrawer');
    }
  };

  onSignUp = async () => {
    const {email, password} = this.state;
    let resp;
    try {
      resp = await signUpUser(email.toLowerCase(), password);
    } catch (err) {
      console.log(err);
      resp = {
        statusCode: 9,
        error: err.message,
      };
    } finally {
      this.animateScreenIn();
      if (resp.statusCode !== 1 || !resp.isUserCreated) {
        return this.setState({
          isLoading: false,
          snack: true,
          snackText: resp.error,
        });
      }
      this.setState({
        isLoading: false,
        snack: true,
        snackText: 'User Created, we have sent a confirmation mail',
      });
    }
  };

  onPress = async () => {
    const {isOnLogin, email, password} = this.state;

    if (!validator.isEmail(email)) {
      this.emailRef.focus();
      return this.setState({
        isLoading: false,
        snack: true,
        snackText: 'Not a valid email!',
      });
    }

    if (password.length < 6 || password.length > 40) {
      this.passwordRef.focus();
      return this.setState({
        isLoading: false,
        snack: true,
        snackText: 'Passwords should be of 6-40 characters long!',
      });
    }

    this.setIsLoading(true);
    if (isOnLogin) {
      this.onLogin();
    } else {
      this.onSignUp();
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
              ref={(r) => (this.emailRef = r)}
              mode="outlined"
              label="Email Id"
              value={email}
              onChangeText={(a) => this.setEmail(a)}
            />
            <TextInput
              ref={(r) => (this.passwordRef = r)}
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={(h) => this.setPassword(h)}
              style={{
                marginTop: 10,
              }}
              secureTextEntry={true}
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
