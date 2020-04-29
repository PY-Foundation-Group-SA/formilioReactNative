import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  addFormScreenContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
  },
  mainCardContainer: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  addFormBottomContainer: {
    position: 'absolute',
    bottom: 10,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  addFormButtons: {
    marginHorizontal: 5,
  },
});
