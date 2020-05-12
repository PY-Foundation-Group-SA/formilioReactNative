import React, {Component} from 'react';
import {Alert} from 'react-native';
import {FAB, Portal, Provider, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

class Fab extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      snack: false,
      snackText: '',
    };
  }

  _onStateChange = ({open}) => this.setState({open});

  onChangeTheme = () => {
    const {state, disableDarkTheme, enableDarkTheme} = this.context;
    if (state.theme) {
      this.setState({snack: true, snackText: 'Light Mode Turned On'});
      disableDarkTheme();
    } else {
      this.setState({snack: true, snackText: 'Dark Mode Turned On'});
      enableDarkTheme();
    }
  };

  onDisconnectServer = async () => {
    const {removeToken} = this.context;
    Alert.alert(
      'Log Out',
      'You are sure you want to log out?',
      [
        {
          text: 'Log Out',
          onPress: async () => {
            await removeToken();
            this.props.navigation.navigate('UserStartingScreen');
          },
        },
        {text: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  render() {
    const {state} = this.context;
    const {open} = this.state;

    return (
      <>
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'close' : 'plus'}
              actions={[
                {
                  icon: ({size}) => {
                    return <Icon name="plus" size={size} />;
                  },
                  onPress: () => this.props.onAddForm(),
                },
                {
                  icon: ({size}) => {
                    return (
                      <Icon name={state.theme ? 'moon' : 'sun'} size={size} />
                    );
                  },
                  label: 'Switch Theme',
                  onPress: this.onChangeTheme,
                },
                {
                  icon: ({size}) => {
                    return <Icon name="server" size={size} />;
                  },
                  label: 'Log Out',
                  onPress: this.onDisconnectServer,
                },
              ]}
              onStateChange={this._onStateChange}
            />
          </Portal>
        </Provider>
        <Snackbar
          duration={Snackbar.DURATION_SHORT}
          visible={this.state.snack}
          onDismiss={() => this.setState({snack: false})}>
          {this.state.snackText}
        </Snackbar>
      </>
    );
  }
}

export default Fab;
