import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  userStartingContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 20,
    width: Dimensions.get('window').width - 40,
  },
  modeToggleContainer: {
    position: 'absolute',
    bottom: 10,
  },
});
