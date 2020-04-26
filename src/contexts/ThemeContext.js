import createDataContext from './createDataContext';

const ThemeReducer = (blogPosts, action) => {
  switch (action.type) {
    case 'darkTheme_enable':
      return [1];
    case 'darkTheme_disable':
      return [0];
    default:
      return [0];
  }
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
  ThemeReducer,
  {enableDarkTheme, disableDarkTheme},
  [0],
);
