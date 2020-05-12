import createDataContext from './createDataContext';
import {storeData, removeValue} from '../utils/asyncStorageHelper';

const UserContext = (UserSet, action) => {
  switch (action.type) {
    case 'add_token':
      storeData('TOKEN', action.payload.token);
      return {
        apiUrl: UserSet.apiUrl,
        token: action.payload.token,
        theme: UserSet.theme,
      };
    case 'remove_token':
      removeValue('TOKEN');
      return {apiUrl: UserSet.apiUrl, token: '', theme: UserSet.theme};
    case 'darkTheme_enable':
      storeData('THEME', 'true');
      return {
        apiUrl: UserSet.apiUrl,
        token: UserSet.token,
        theme: true,
      };
    case 'darkTheme_disable':
      storeData('THEME', 'false');
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
