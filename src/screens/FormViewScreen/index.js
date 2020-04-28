/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ScrollView, PermissionsAndroid, Alert} from 'react-native';
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
import RNFS from 'react-native-fs';

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
      snackText: '',
    };

    this.form = this.props.navigation.getParam('form');
  }

  downloadHandler = async () => {
    const {state} = this.context;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted) {
        this.setState({snack: true, snackText: 'File Download Starting'});
        RNFS.downloadFile({
          fromUrl:
            state.apiUrl + 'auth/getResponse?formName=' + this.form.formName,
          headers: {
            Authorization: state.token,
          },
          background: true,
          discretionary: true,
          toFile: RNFS.DownloadDirectoryPath + `/${this.form.formName}.csv`,
        }).promise.then(() => {
          Alert.alert(
            'File Download',
            'Your file was successfully downloaded to your downloads folder',
            [{text: 'ok'}],
            {cancelable: true},
          );
          console.log('File Downloaded');
        });
      } else {
        Alert.alert(
          'File Downloaded',
          'Sorry, We could not download your file! Permission Denied',
          [{text: 'cancel'}],
          {cancelable: true},
        );
      }
    } catch (err) {
      Alert.alert(
        'File Downloaded',
        'Unexpected error, please try again later!',
        [{text: 'cancel'}],
        {cancelable: true},
      );
    }
  };

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
        <View style={{flexDirection: 'row'}} key={field.name}>
          <Paragraph>{field.name}</Paragraph>
        </View>
      );
    });
  };

  render() {
    return (
      <>
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
                this.setState({snack: true, snackText: 'Link Copied'});
              }}>
              <Paragraph>
                {this.form.url ? this.form.url : 'Url not found'}
              </Paragraph>
            </TouchableOpacity>
            <Divider />
          </View>
          <View style={{marginBottom: 20}}>
            <Caption>Form Fields</Caption>
            {this.renderFormFields()}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button mode="contained" onPress={() => this.downloadHandler()}>
              Download CSV
            </Button>
            <Button
              mode="contained"
              style={{backgroundColor: Colors.red700}}
              onPress={() =>
                Alert.alert(
                  'Delete Form',
                  'Your are about to delete a form. All response collected through that form will be deleted!',
                  [
                    {text: 'cancel'},
                    {text: 'Delete', onPress: () => this.deleteFormHandler()},
                  ],
                  {cancelable: true},
                )
              }>
              Delete Form
            </Button>
          </View>
        </ScrollView>
        <Snackbar
          style={{alignItems: 'center'}}
          duration={Snackbar.DURATION_SHORT}
          visible={this.state.snack}
          onDismiss={() => this.setState({snack: false})}>
          {this.state.snackText}
        </Snackbar>
      </>
    );
  }
}

export default FormViewScreen;
