import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  homeScreenLoaderContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    zIndex: 1,
    paddingTop: height / 2 - 80,
  },
  homeScreenMainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    zIndex: 1,
    paddingVertical: 20,
    paddingBottom: 0,
  },
  searchContainer: {
    borderRadius: 8,
    marginHorizontal: 20,
  },
  flatList: {
    marginTop: 10,
  },
  Card: {
    marginVertical: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  cardInnerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
