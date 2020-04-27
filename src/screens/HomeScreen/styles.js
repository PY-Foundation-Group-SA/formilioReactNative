import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  homeScreenLoaderContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  homeScreenMainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
    padding: 10,
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
