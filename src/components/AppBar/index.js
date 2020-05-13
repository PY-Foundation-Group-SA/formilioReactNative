import React from 'react';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const AppBar = (props) => {
  const {downloadHandler, deleteFormHandler, goBack} = props;
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => goBack()} />
      <Appbar.Content title="" />
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
    </Appbar.Header>
  );
};

export default AppBar;
