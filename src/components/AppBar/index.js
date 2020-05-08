import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const AppBar = (props) => {
  const {downloadHandler, deleteFormHandler, goBack} = props;
  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action
        icon={({color, direction, size}) => (
          <Icon name="arrow-left" size={size} color={color} />
        )}
        onPress={() => goBack()}
      />
      <Appbar.Action
        icon={({color, direction, size}) => (
          <Icon name="download" size={size} color={color} />
        )}
        onPress={() => downloadHandler()}
      />
      <Appbar.Action
        icon={({color, direction, size}) => (
          <Icon name="trash-2" size={size} color={color} />
        )}
        onPress={() => deleteFormHandler()}
      />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default AppBar;
