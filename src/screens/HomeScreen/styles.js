import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  homeScreenLoaderContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    zIndex: 1,
    paddingTop: Dimensions.get('window').height / 2 - 80,
  },
  homeScreenMainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
  },
  searchContainer: {
    margin: 10,
  },
  flatList: {
    alignSelf: 'stretch',
  },
  Card: {
    margin: 10,
    maxHeight: 160,
    overflow: 'hidden',
  },
});
