import React, {Component} from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

class Fab extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  _onStateChange = ({open}) => this.setState({open});

  onChangeTheme = () => {
    const {state, disableDarkTheme, enableDarkTheme} = this.context;
    if (state.theme) {
      disableDarkTheme();
    } else {
      enableDarkTheme();
    }
  };

  render() {
    const {state} = this.context;
    const {open} = this.state;

    return (
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
                onPress: () => console.log('Pressed add'),
              },
              {
                icon: ({size}) => {
                  return <Icon name="trash" size={size} />;
                },
                label: 'Delete',
                onPress: this.onChangeTheme,
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
            ]}
            onStateChange={this._onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    );
  }
}

export default Fab;
