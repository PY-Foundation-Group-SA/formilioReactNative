/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const Fab = (props) => {
  return (
    <>
      <Provider>
        <Portal>
          <FAB
            style={{
              position: 'absolute',
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            icon={({size}) => <Icon size={size} name="plus" />}
            onPress={() => props.onAddForm()}
          />
        </Portal>
      </Provider>
    </>
  );
};

export default Fab;
