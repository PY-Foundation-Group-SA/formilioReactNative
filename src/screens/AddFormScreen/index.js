/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Snackbar, ActivityIndicator} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

// importing components
import FormStarting from '../../components/FormStarting';
import FormFieldInput from '../../components/FormFieldInput';

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
      formName: '',
      description: '',

      snack: false,
      snackText: '',
      isLoading: false,
    };

    this.regList = this.props.navigation.getParam('validatorNames');
  }

  setFormFields = (name, regEx) => {
    const {formFields} = this.state;
    const index = formFields.length - 1;
    formFields[index].name = name;
    formFields[index].regEx = regEx;
    this.setState({
      formFields,
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

  createFormOnPress = () => {
    this.setState({
      isLoading: true,
    });
    const {formName, formFields, description} = this.state;
    const {state} = this.context;

    if (formName.length > 40 || formName.length < 6) {
      this.setState({
        isLoading: false,
        snack: true,
        snackText: 'Form Name should have 6-40 characters!',
      });
      return;
    }

    if (description.length > 400 || description.length < 6) {
      this.setState({
        isLoading: false,
        snack: true,
        snackText: 'Description should have 6-400 characters!',
      });
      return;
    }

    createForm(state.apiUrl, state.token, formName, formFields, description)
      .then((isCreated) => {
        if (isCreated) {
          this.props.navigation.goBack();
        }
      })
      .catch(() => {
        console.log('Some Error happened on Create');
      });
  };

  setFormName = (formName) => {
    this.setState({
      formName,
    });
  };

  setFormDescription = (description) => {
    this.setState({
      description,
    });
  };

  getFormName = () => {
    return (
      <FormStarting
        title="Let's start with Form Name"
        onSubmitEditing={this.setFormName}
        placeholder="Your Form Name"
        minMax={[6, 40]}
      />
    );
  };

  getFormDescription = () => {
    return (
      <FormStarting
        title="Help Your Customers Know What's the Form About"
        onSubmitEditing={this.setFormDescription}
        placeholder="Form Description"
        minMax={[6, 400]}
      />
    );
  };

  getFormFields = () => {
    return (
      <FormFieldInput
        theme={this.context.state.theme}
        regularExpressions={this.regList}
        setFormFields={this.setFormFields}
        addField={this.addField}
        createForm={this.createFormOnPress}
        placeholder="Field Name"
      />
    );
  };

  renderFormHandler = () => {
    const {formName, description} = this.state;

    if (!formName) {
      return this.getFormName();
    }

    if (!description) {
      return this.getFormDescription();
    }

    return this.getFormFields();
  };

  render() {
    const {isLoading} = this.state;

    if (isLoading) {
      return (
        <View
          style={[
            styles.addFormScreenContainer,
            {backgroundColor: this.context.state.theme ? 'black' : 'white'},
          ]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <>
        <View
          style={[
            styles.addFormScreenContainer,
            {backgroundColor: this.context.state.theme ? 'black' : 'white'},
          ]}>
          <View style={styles.goBackButtonContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="x"
                size={24}
                color={this.context.state.theme ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>
          {this.renderFormHandler()}
          <Snackbar
            style={{alignItems: 'center'}}
            duration={Snackbar.DURATION_SHORT}
            visible={this.state.snack}
            onDismiss={() => this.setState({snack: false})}>
            {this.state.snackText}
          </Snackbar>
        </View>
      </>
    );
  }
}

export default AddFormScreen;
