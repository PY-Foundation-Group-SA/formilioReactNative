/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Colors, Card, FAB, TextInput, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {HideWithKeyboard} from 'react-native-hide-with-keyboard';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

// importing apiHelpers
import {createForm} from '../../utils/apiHelpers';

// importing styles
import styles from './styles';

class AddFormScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      formFields: [
        {
          name: '',
          regEx: '',
        },
      ],
      addFieldDisable: true,
      formName: '',
    };

    this.regList = [
      'email',
      'regNo',
      'alpha',
      'alphaNumeric',
      'number',
      'url',
      'username',
    ];
  }

  setFormFields = (name, regEx, index) => {
    const {formFields} = this.state;
    formFields[index].name = name;
    formFields[index].regEx = regEx;
    if ([formFields[index].name, formFields[index].regEx].includes('')) {
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
    formFields.push({name: '', regEx: ''});
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

  createFormOnPress = () => {
    const {formName, formFields} = this.state;
    const {state} = this.context;
    createForm(state.apiUrl, state.token, formName, formFields)
      .then((isCreated) => {
        if (isCreated) {
          this.props.navigation.goBack();
        }
      })
      .catch(() => {
        console.log('Some Error happened on Create');
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
          onPress={() => this.setFormFields(form.name, regItem, index)}>
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
            title={item.name === '' ? 'New Field' : item.name}
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
              value={item.name}
              onChangeText={(name) =>
                this.setFormFields(name, item.regEx, index)
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
    const {addFieldDisable, formName} = this.state;

    return (
      <KeyboardAvoidingView style={styles.addFormScreenContainer}>
        <ScrollView
          alwaysBounceVertical={true}
          automaticallyAdjustContentInsets={true}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}>
          <TextInput
            mode="outlined"
            label="Name your form"
            style={{
              marginBottom: 10,
            }}
            value={formName}
            onChangeText={(name) => this.setState({formName: name})}
          />
          {this.renderFieldCards()}
        </ScrollView>
        <HideWithKeyboard style={styles.addFormBottomContainer}>
          <FAB
            style={styles.addFormButtons}
            small
            icon="check"
            label="Make Form"
            disabled={addFieldDisable || this.state.formName === ''}
            onPress={() => this.createFormOnPress()}
          />
          <FAB
            style={styles.addFormButtons}
            small
            icon="plus"
            label="Add Field"
            disabled={addFieldDisable}
            onPress={() => this.addField()}
          />
        </HideWithKeyboard>
      </KeyboardAvoidingView>
    );
  }
}

export default AddFormScreen;
