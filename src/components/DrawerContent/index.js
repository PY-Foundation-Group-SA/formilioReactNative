/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  Headline,
  Divider,
  Drawer,
  Caption,
  TouchableRipple,
  Paragraph,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing components
import DarkModeToggleSwitch from '../DarkModeToggleSwitch';

const DrawerContent = (props) => {
  const theme = props.theme;
  const logOut = props.logOut;
  const navigation = props.navigation;

  const onLogOut = () => {
    Alert.alert(
      'Log Out',
      'You are sure you want to log out?',
      [
        {
          text: 'Log Out',
          onPress: async () => {
            return await logOut();
          },
        },
        {text: 'cancel'},
      ],
      {cancelable: true},
    );
  };
  const state = props.state;
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Headline style={styles.drawerScreenHeading}>Formilio</Headline>
        <Divider style={{marginVertical: 10}} />
        <Caption style={styles.drawerHelperText}>Primary</Caption>
        <Drawer.Item
          label="Your Forms"
          icon={({size, color}) => (
            <Icon size={size} name="home" color={color} />
          )}
          onPress={() => navigation.navigate('HomeScreen')}
          active={state.index === 0}
        />
        <Drawer.Item
          label="Add New Form"
          icon={({size, color}) => (
            <Icon size={size} name="plus" color={color} />
          )}
          onPress={() => navigation.navigate('AddFormScreen')}
          active={state.index === 1}
        />
        <Divider style={{marginVertical: 10}} />
        <Caption style={styles.drawerHelperText}>Theme</Caption>
        <Drawer.Section>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Paragraph>Dark Theme</Paragraph>
              <DarkModeToggleSwitch />
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Item
          label="Log Out"
          icon={({size, color}) => (
            <Icon size={size} name="log-out" color={color} />
          )}
          onPress={() => onLogOut()}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    marginTop: 0,
    paddingHorizontal: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  drawerScreenHeading: {
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
  drawerHelperText: {
    marginHorizontal: 10,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
