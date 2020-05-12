import {API_URL} from 'react-native-dotenv';
import {Base64} from 'js-base64';

export const signUpUser = (email, password) => {
  const encodedPass = Base64.encode(password);
  const body = JSON.stringify({
    email,
    password: encodedPass,
  });
  return new Promise((resolve, reject) => {
    fetch(API_URL + 'createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then((resp) => resp.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const loginUser = (email, password) => {
  const encodedPass = Base64.encode(password);
  const body = JSON.stringify({
    email,
    password: encodedPass,
  });
  return new Promise((resolve, reject) => {
    fetch(API_URL + 'signInUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then((resp) => resp.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const getAllForms = (token) => {
  return fetch(API_URL + 'auth/getAllForm', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.payload.forms) {
        return data.payload.forms;
      }
      return false;
    })
    .catch((err) => console.error(err.message));
};

export const getValidate = (token) => {
  return fetch(API_URL + 'auth/validators', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.payload.validatorNames) {
        return data.payload.validatorNames;
      }
      return [];
    })
    .catch((err) => console.error(err.message));
};

export const getForm = (token, fid) => {
  return new Promise((resolve, reject) => {
    fetch(API_URL + 'auth/getForm?fid=' + fid, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const createForm = (token, formName, formField, description) => {
  let json;
  if (description !== '') {
    json = JSON.stringify({
      formName: formName,
      fields: formField,
      description: description,
    });
  } else {
    json = JSON.stringify({
      formName: formName,
      fields: formField,
    });
  }
  return fetch(API_URL + 'auth/createForm', {
    method: 'POST',
    headers: {
      Authorization: token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: json,
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.isFormCreated) {
        return data.isFormCreated;
      }
      return false;
    })
    .catch((err) => console.error(err.message));
};

export const deleteForm = (token, fid) => {
  return fetch(API_URL + 'auth/deleteForm?fid=' + fid, {
    method: 'DELETE',
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.isFormCreated) {
        return data.isFormCreated;
      }
      return false;
    })
    .catch((err) => console.error(err.message));
};
