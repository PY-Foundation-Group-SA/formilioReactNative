/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {Colors, Card, FAB, TextInput, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// importing styles
import styles from './styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

class AddFormScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: [
        {
          formName: '',
          regEx: '',
        },
      ],
      addFieldDisable: true,
    };

    this.regList = [
      'email',
      'VIT Reg. No.',
      'alpha',
      'alphaNumeric',
      'number',
      'url',
      'username',
      'match',
    ];
  }

  setFormFields = (formName, regEx, index) => {
    const {formFields} = this.state;
    formFields[index].formName = formName;
    formFields[index].regEx = regEx;
    if ([formFields[index].formName, formFields[index].regEx].includes('')) {
      this.setState({
        formFields,
      });
      return;
    }
    this.setState({
      formFields,
      addFieldDisable: false,
    });
  };

  addField = () => {
    const {formFields} = this.state;
    formFields.push({formName: '', regEx: ''});
    this.setState({
      formFields,
      addFieldDisable: true,
    });
  };

  removeField = (index) => {
    const {formFields} = this.state;
    const newFormFields = formFields.filter((field, i) => i !== index);
    this.setState({
      formFields: newFormFields,
    });
  };

  renderTitleBin = (index) => {
    return (
      <TouchableOpacity onPress={() => this.removeField(index)}>
        <Icon color={Colors.red700} name="trash" size={24} />
      </TouchableOpacity>
    );
  };

  renderRegChips = (form, index) => {
    return this.regList.map((regItem) => {
      return (
        <Chip
          selected={regItem === form.regEx ? true : false}
          style={{margin: 2}}
          onPress={() => this.setFormFields(form.formName, regItem, index)}>
          {regItem}
        </Chip>
      );
    });
  };

  renderFieldCards = () => {
    const {formFields} = this.state;

    return formFields.map((item, index) => {
      return (
        <Card style={styles.mainCardContainer}>
          <Card.Title
            title={item.formName === '' ? 'New Field' : item.formName}
            right={() => this.renderTitleBin(index)}
            rightStyle={{paddingRight: 20}}
          />
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Field Name"
              style={{
                marginBottom: 10,
              }}
              value={item.formName}
              onChangeText={(formName) =>
                this.setFormFields(formName, item.regEx, index)
              }
            />
          </Card.Content>
          <Card.Actions style={{flexWrap: 'wrap'}}>
            {this.renderRegChips(item, index)}
          </Card.Actions>
        </Card>
      );
    });
  };

  render() {
    const {addFieldDisable} = this.state;

    return (
      <KeyboardAvoidingView style={styles.addFormScreenContainer}>
        <ScrollView
          alwaysBounceVertical={true}
          automaticallyAdjustContentInsets={true}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}>
          {this.renderFieldCards()}
        </ScrollView>
        <View style={styles.addFormBottomContainer}>
          <FAB
            style={styles.addFormButtons}
            small
            icon="check"
            label="Make Form"
            disabled={addFieldDisable}
            onPress={() => console.log('create clicked')}
          />
          <FAB
            style={styles.addFormButtons}
            small
            icon="plus"
            label="Add Field"
            disabled={addFieldDisable}
            onPress={() => this.addField()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default AddFormScreen;
