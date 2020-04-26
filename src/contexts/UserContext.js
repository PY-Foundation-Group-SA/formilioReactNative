import createDataContext from './createDataContext';
import {storeData} from '../utils/asyncStorageHelper';

const UserContext = (UserSet, action) => {
  switch (action.type) {
    case 'add_apiURl':
      storeData('API_URL', action.payload.apiUrl);
      return {
        apiUrl: action.payload.apiUrl,
        token: UserSet.token,
        theme: UserSet.theme,
      };
    case 'remove_apiURL':
      return {apiUrl: '', token: UserSet.token, theme: UserSet.theme};
    case 'add_token':
      storeData('TOKEN', action.payload.token);
      return {
        apiUrl: UserSet.apiUrl,
        token: action.payload.token,
        theme: UserSet.theme,
      };
    case 'remove_token':
      return {apiUrl: UserSet.apiUrl, token: '', theme: UserSet.theme};
    case 'darkTheme_enable':
      return {
        apiUrl: UserSet.apiUrl,
        token: UserSet.token,
        theme: true,
      };
    case 'darkTheme_disable':
      return {
        apiUrl: UserSet.apiUrl,
        token: UserSet.token,
        theme: false,
      };
    default:
      return {
        apiUrl: UserSet.apiUrl,
        token: UserSet.token,
        theme: UserSet.theme,
      };
  }
};

const addApiUrl = (dispatch) => {
  return (apiUrl) => {
    dispatch({type: 'add_apiURl', payload: {apiUrl}});
  };
};

const removeApiUrl = (dispatch) => {
  return () => {
    dispatch({type: 'remove_apiURL'});
  };
};

const addToken = (dispatch) => {
  return (token) => {
    dispatch({type: 'add_token', payload: {token}});
  };
};

const removeToken = (dispatch) => {
  return () => {
    dispatch({type: 'remove_token'});
  };
};

const enableDarkTheme = (dispatch) => {
  return () => {
    dispatch({type: 'darkTheme_enable'});
  };
};

const disableDarkTheme = (dispatch) => {
  return () => {
    dispatch({type: 'darkTheme_disable'});
  };
};

export const {Context, Provider} = createDataContext(
  UserContext,
  {
    addApiUrl,
    removeApiUrl,
    addToken,
    removeToken,
    enableDarkTheme,
    disableDarkTheme,
  },
  {
    apiUrl: '',
    token: '',
    theme: false,
  },
);