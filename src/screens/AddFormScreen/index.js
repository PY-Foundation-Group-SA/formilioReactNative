/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {KeyboardAvoidingView, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Colors, Card, FAB, TextInput, Chip, Snackbar} from 'react-native-paper';
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
      description: '',

      snack: false,
      snackText: '',
    };

    this.regList = this.props.navigation.getParam('validatorNames');
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
    if (index === 0 && formFields.length === 1) {
      return;
    }
    const newFormFields = formFields.filter((field, i) => i !== index);
    this.setState({
      formFields: newFormFields,
    });
  };

  createFormOnPress = () => {
    const {formName, formFields, description} = this.state;
    const {state} = this.context;

    if (formName.length > 40 || formName.length < 6) {
      this.setState({
        snack: true,
        snackText: 'Form Name should have 6-40 characters!',
      });
      return;
    }

    if (description.length > 400 || description.length < 6) {
      this.setState({
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

  renderTitleBin = (index) => {
    return (
      <TouchableOpacity onPress={() => this.removeField(index)}>
        <Icon color={Colors.red700} name="trash" size={24} />
      </TouchableOpacity>
    );
  };

  renderRegChips = (form, index) => {
    return this.regList.map((regItem) => {
      if (regItem === 'match') {
        return;
      }
      return (
        <Chip
          key={regItem}
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

    return (
      <FlatList
        style={{
          alignSelf: 'stretch',
          margin: 0,
        }}
        data={formFields}
        keyExtractor={(_, index) => String(index + 1)}
        renderItem={({item, index}) => {
          return (
            <Card style={styles.mainCardContainer} elevation={4}>
              <Card.Title
                title={`Field ${index + 1}`}
                right={() => this.renderTitleBin(index)}
                rightStyle={{paddingRight: 20}}
              />
              <Card.Content>
                <TextInput
                  mode="outlined"
                  label="Field Name"
                  placeholder={'Field ' + (index + 1)}
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
        }}
      />
    );
  };

  render() {
    const {addFieldDisable, formName, description} = this.state;

    return (
      <KeyboardAvoidingView
        style={[
          styles.addFormScreenContainer,
          {backgroundColor: this.context.state.theme ? 'black' : 'white'},
        ]}>
        <ScrollView
          alwaysBounceVertical={true}
          automaticallyAdjustContentInsets={true}
          contentContainerStyle={{
            padding: 10,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}>
          <TextInput
            mode="outlined"
            label="Name your form"
            placeholder="FormForParty"
            style={{
              marginBottom: 10,
            }}
            value={formName}
            onChangeText={(name) => {
              if (name.length > 40) {
                return;
              }
              this.setState({formName: name});
            }}
          />
          <TextInput
            mode="outlined"
            label="Description"
            placeholder="Invitation for party!!!"
            style={{
              marginBottom: 10,
            }}
            value={description}
            onChangeText={(desc) => {
              if (desc.length > 400) {
                return;
              }
              this.setState({description: desc});
            }}
            multiline={true}
            numberOfLines={4}
            autoCapitalize="sentences"
            textAlignVertical="top"
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
        <Snackbar
          style={{alignItems: 'center'}}
          duration={Snackbar.DURATION_SHORT}
          visible={this.state.snack}
          onDismiss={() => this.setState({snack: false})}>
          {this.state.snackText}
        </Snackbar>
      </KeyboardAvoidingView>
    );
  }
}

export default AddFormScreen;
