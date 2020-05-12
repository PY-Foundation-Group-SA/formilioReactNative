/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {API_URL} from 'react-native-dotenv';
import {
  View,
  ScrollView,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {
  Caption,
  Title,
  Divider,
  Snackbar,
  ActivityIndicator,
} from 'react-native-paper';
import RNFS from 'react-native-fs';

// importing components
import AppBar from '../../components/AppBar';

// importing context
import {Context as UserContext} from '../../contexts/UserContext';

// importing apiHelpers
import {deleteForm, getForm} from '../../utils/apiHelpers';

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
      isLoading: true,
    };

    this.form = null;
  }

  componentDidMount() {
    const fid = this.props.navigation.getParam('fid');
    this.loadForm(fid);
  }

  loadForm = async (fid) => {
    const {state} = this.context;
    let resp;
    try {
      resp = await getForm(state.token, fid);
    } catch (err) {
      console.error(err.message);
      this.props.navigation.navigate('HomeScreen');
    } finally {
      if (!resp.formRetrieved) {
        return this.setState({
          snack: true,
          snackText: resp.error
            ? resp.error
            : 'We are unable to retrieve the form. Try again later!',
        });
      }
      this.form = resp.form;
      this.setState({
        isLoading: false,
      });
    }
  };

  downloadHandler = async () => {
    const {state} = this.context;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === 'granted') {
        this.setState({snack: true, snackText: 'File Download Starting'});
        RNFS.downloadFile({
          fromUrl: API_URL + 'auth/getResponse?fid=' + this.form._id,
          headers: {
            Authorization: state.token,
          },
          background: true,
          discretionary: true,
          toFile: RNFS.DownloadDirectoryPath + `/${this.form.formName}.csv`,
        })
          .promise.then(() => {
            Alert.alert(
              'File Download',
              'Your file was successfully downloaded to your downloads folder',
              [{text: 'ok'}],
              {cancelable: true},
            );
            console.log('File Downloaded');
          })
          .catch((err) => {
            console.log(err.message);
            Alert.alert(
              'File Download',
              'Unexpected error, please try again later!',
              [{text: 'cancel'}],
              {cancelable: true},
            );
          });
      } else {
        Alert.alert(
          'File Download',
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
    deleteForm(state.token, this.form._id)
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
          <Title>{field.name}</Title>
        </View>
      );
    });
  };

  render() {
    const {isLoading} = this.state;
    const theme = this.context.state.theme;

    if (isLoading) {
      return (
        <View
          style={[
            {
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'stretch',
              zIndex: 1,
              // paddingTop: Dimensions.get('window').height / 2 - 80,
            },
            {
              backgroundColor: theme ? 'black' : 'white',
            },
          ]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <>
        <ScrollView
          contentContainerStyle={[
            styles.formViewMainContainer,
            {backgroundColor: this.context.state.theme ? 'black' : 'white'},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: 20}}>
            <Caption>Form Name</Caption>
            <Title>{this.form.formName}</Title>
          </View>
          <Divider />
          <View style={{marginBottom: 20}}>
            <Caption>Created On</Caption>
            <Title>{Date(this.form.createOn)}</Title>
          </View>
          <View style={{marginBottom: 20}}>
            <Caption>Description</Caption>
            <Title>
              {this.form.description ? this.form.description : 'Not Provided'}
            </Title>
          </View>
          <View style={{marginBottom: 20}}>
            <Caption>Form URL (Tap:Open, Long Press:Copy)</Caption>
            <TouchableOpacity
              onPress={() => {
                if (this.form.url) {
                  this.setState({
                    snack: true,
                    snackText: 'Opening Url in Browser',
                  });
                  Linking.openURL(this.form.url)
                    .then(() => {
                      console.log('linked opened');
                    })
                    .catch((err) => {
                      console.log(err.message);
                      this.setState({
                        snack: true,
                        snackText: 'Failed to Url',
                      });
                    });
                }
              }}
              onLongPress={() => {
                Clipboard.setString(this.form.url);
                this.setState({snack: true, snackText: 'Link Copied'});
              }}>
              <Title>{this.form.url ? this.form.url : 'Url not found'}</Title>
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={{marginBottom: 20}}>
            <Caption>Form Fields</Caption>
            {this.renderFormFields()}
          </View>
        </ScrollView>
        <AppBar
          downloadHandler={this.downloadHandler}
          deleteFormHandler={() =>
            Alert.alert(
              'Delete Form',
              'Your are about to delete a form. All response collected through that form will be deleted!',
              [
                {text: 'cancel'},
                {text: 'Delete', onPress: () => this.deleteFormHandler()},
              ],
              {cancelable: true},
            )
          }
          goBack={this.props.navigation.goBack}
        />
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
