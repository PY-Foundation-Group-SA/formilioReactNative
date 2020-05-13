import React, {useRef, useState} from 'react';
import {Headline, TextInput, HelperText} from 'react-native-paper';
import {Animated, StyleSheet, Dimensions, View} from 'react-native';

const FormStarting = (props) => {
  const [text, setText] = useState('');
  const animateStart = useRef(new Animated.Value(0)).current;
  const opacity = animateStart.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  Animated.timing(animateStart, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  const _hasErrors = () => {
    const {minMax} = props;
    if (text.length > minMax[0] && text.length < minMax[1]) {
      return false;
    }
    return true;
  };

  const set = () => {
    if (_hasErrors()) {
      return null;
    }
    Animated.timing(animateStart, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      props.onSubmitEditing(text);
      setText('');
    });
  };

  return (
    <Animated.View style={[styles.animatedView, {opacity}]}>
      <Headline style={styles.headlineStyle}>{props.title}</Headline>
      <View style={styles.inputContainer}>
        <TextInput
          mode="flat"
          error={_hasErrors()}
          placeholder={props.placeholder}
          multiline={false}
          maxLength={props.maxLength}
          onSubmitEditing={() => set()}
          value={text}
          onChangeText={(t) => setText(t)}
          showSoftInputOnFocus={true}
          spellCheck={false}
          textAlign="center"
          textContentType="name"
          style={styles.textInput}
        />
        <HelperText type="error" visible={_hasErrors()}>
          Name Should be {`${props.minMax[0]}-${props.minMax[1]}`} characters
          long
        </HelperText>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headlineStyle: {
    textAlign: 'center',
  },
  inputContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginVertical: 40,
  },
  textInput: {
    width: Dimensions.get('window').width - 80,
  },
});

export default FormStarting;
