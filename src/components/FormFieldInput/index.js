/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Headline, TextInput, Chip, Button} from 'react-native-paper';
import {Animated, StyleSheet, Dimensions, View, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const FormStarting = (props) => {
  const [reg, setReg] = useState('');
  const [text, setText] = useState('');
  const animateStart = useRef(new Animated.Value(0)).current;
  const regSelected = useRef(new Animated.Value(0)).current;
  const formNameFilled = useRef(new Animated.Value(0)).current;

  let regOpacity = animateStart.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  regOpacity = regSelected.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const translateRegSelected = regSelected.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });
  const rotateRegSelected = regSelected.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  let inputOpacity = regSelected.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  inputOpacity = formNameFilled.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const translateInputField = formNameFilled.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });
  const rotateInputField = formNameFilled.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  let continueOpacity = formNameFilled.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  Animated.timing(animateStart, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  const createFormField = () => {
    Animated.timing(formNameFilled, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Keyboard.dismiss();
    const {setFormFields} = props;
    setFormFields(text, reg);
    setText('');
    setReg('');
  };

  const addNewField = () => {
    Animated.timing(formNameFilled, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(regSelected, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(animateStart, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    });
    props.addField();
  };

  return (
    <View style={styles.animatedViewContainer}>
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [
              {translateX: translateRegSelected},
              {rotate: rotateRegSelected},
            ],
            opacity: regOpacity,
            zIndex: 2,
            backgroundColor: props.theme ? 'black' : 'white',
          },
        ]}>
        <Headline style={styles.headlineStyle}>
          Pick Regular Expression For Your New Field
        </Headline>
        <View style={styles.inputContainer}>
          {props.regularExpressions.map((regItem) => {
            if (regItem === 'match') {
              return;
            }
            return (
              <Chip
                key={regItem}
                selected={regItem === reg ? true : false}
                style={{margin: 2}}
                onPress={() => setReg(regItem)}>
                {regItem}
              </Chip>
            );
          })}
        </View>
        <Button
          mode="contained"
          loading={false}
          disabled={reg === '' ? true : false}
          onPress={() => {
            Animated.timing(regSelected, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }}>
          Next
        </Button>
      </Animated.View>
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [
              {translateX: translateInputField},
              {rotate: rotateInputField},
            ],
            opacity: inputOpacity,
            zIndex: 1,
            backgroundColor: props.theme ? 'black' : 'white',
          },
        ]}>
        <Headline style={styles.headlineStyle}>Give Your Field Name</Headline>
        <View style={styles.inputContainer}>
          <TextInput
            mode="flat"
            placeholder={props.placeholder}
            multiline={false}
            maxLength={props.maxLength}
            onSubmitEditing={() => createFormField()}
            value={text}
            onChangeText={(t) => setText(t.trim())}
            showSoftInputOnFocus={true}
            spellCheck={false}
            textAlign="center"
            textContentType="name"
            dense={true}
            style={styles.textInput}
          />
        </View>
        <Button
          mode="contained"
          loading={false}
          disabled={text === '' ? true : false}
          onPress={() => createFormField()}>
          Next
        </Button>
      </Animated.View>
      <Animated.View
        style={[
          styles.animatedView,
          {
            opacity: continueOpacity,
            zIndex: 0,
            backgroundColor: props.theme ? 'black' : 'white',
          },
        ]}>
        <Headline style={styles.headlineStyle}>
          Add More Fields / Create Your Form
        </Headline>
        <View style={styles.continueButtonContainer}>
          <Button mode="text" loading={false} onPress={() => addNewField()}>
            <Icon
              name="plus"
              size={24}
              color={props.theme ? 'white' : 'black'}
            />
          </Button>
          <Button
            mode="text"
            loading={false}
            onPress={() => props.createForm()}>
            <Icon
              name="check"
              size={24}
              color={props.theme ? 'white' : 'black'}
            />
          </Button>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedViewContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedView: {
    position: 'absolute',
    height: height,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headlineStyle: {
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginVertical: 40,
    width: width - 80,
    flexWrap: 'wrap',
  },
  textInput: {
    width: width - 120,
  },
  continueButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 60,
  },
});

export default FormStarting;
