import createDataContext from './createDataContext';

const UserContext = (UserSet, action) => {
  switch (action.type) {
    case 'add_apiURl':
      return {
        apiUrl: action.payload.apiUrl,
        header: UserSet.header,
        theme: UserSet.theme,
      };
    case 'remove_apiURL':
      return {apiUrl: '', header: UserSet.header, theme: UserSet.theme};
    case 'add_header':
      return {
        apiUrl: UserSet.apiUrl,
        header: action.payload.header,
        theme: UserSet.theme,
      };
    case 'remove_header':
      return {
        apiUrl: UserSet.apiUrl,
        header: '',
        theme: UserSet.theme,
      };
    case 'darkTheme_enable':
      return {
        apiUrl: UserSet.apiUrl,
        header: UserSet.header,
        theme: true,
      };
    case 'darkTheme_disable':
      return {
        apiUrl: UserSet.apiUrl,
        header: UserSet.header,
        theme: false,
      };
    default:
      return [0];
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

const addHeader = (dispatch) => {
  return (header) => {
    dispatch({type: 'add_header', payload: {header}});
  };
};

const removeHeader = (dispatch) => {
  return () => {
    dispatch({type: 'remove_header'});
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
    addHeader,
    removeHeader,
    enableDarkTheme,
    disableDarkTheme,
  },
  {
    apiUrl: '',
    header: '',
    theme: false,
  },
);
