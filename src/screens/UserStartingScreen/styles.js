import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  userStartingContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  screenSwitcherStarting: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  inputContainer: {
    marginVertical: 10,
    width: Dimensions.get('window').width - 40,
  },
  modeToggleContainer: {
    position: 'absolute',
    bottom: 4,
  },
});
