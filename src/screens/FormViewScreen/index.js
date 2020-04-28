/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {
  Caption,
  Paragraph,
  Title,
  Divider,
  Button,
  Colors,
  Snackbar,
} from 'react-native-paper';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

// importing apiHelpers
import {deleteForm} from '../../utils/apiHelpers';

// importing styles
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

class FormViewScreen extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      snack: false,
    };

    this.form = this.props.navigation.getParam('form');
  }

  deleteFormHandler = () => {
    const {state} = this.context;
    deleteForm(state.apiUrl, state.token, this.form.formName)
      .then(() => {
        this.props.navigation.navigate('HomeScreen');
      })
      .catch(() => {
        console.log('Could not delete form');
      });
  };

  renderFormFields = () => {
    return this.form.fields.map((field) => {
      return (
        <View style={{flexDirection: 'row'}}>
          <Paragraph>{field.name}</Paragraph>
        </View>
      );
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.formViewMainContainer}>
        <View style={{marginBottom: 20}}>
          <Caption>Form Name</Caption>
          <Title>{this.form.formName}</Title>
        </View>
        <Divider />
        <View style={{marginBottom: 20}}>
          <Caption>Created On</Caption>
          <Paragraph>{Date(this.form.createOn)}</Paragraph>
          <Caption>Description</Caption>
          <Paragraph>
            {this.form.description ? this.form.description : 'Not Provided'}
          </Paragraph>
          <Caption>Form URL (Tap to copy)</Caption>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(this.form.url);
              this.setState({snack: true});
            }}>
            <Paragraph>{this.form.url}</Paragraph>
          </TouchableOpacity>
          <Divider />
        </View>
        <View style={{marginBottom: 20}}>
          <Caption>Form Fields</Caption>
          {this.renderFormFields()}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button mode="contained">Download CSV</Button>
          <Button
            mode="contained"
            style={{backgroundColor: Colors.red700}}
            onPress={() => this.deleteFormHandler()}>
            Delete Form
          </Button>
        </View>
        <Snackbar
          duration={Snackbar.DURATION_SHORT}
          visible={this.state.snack}
          onDismiss={() => this.setState({snack: false})}>
          Link Copied
        </Snackbar>
      </ScrollView>
    );
  }
}

export default FormViewScreen;
