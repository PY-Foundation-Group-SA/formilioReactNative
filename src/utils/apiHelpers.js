import axios from 'axios';

export const connectServer = (apiUrl, header) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.post(
        apiUrl + 'connectClient',
        {},
        {
          headers: {
            Authorization: header,
          },
        },
      );
      resolve(resp.data.payload.token);
    } catch (err) {
      console.log(err);
      reject();
    }
  });
};

export const getAllForms = (apiUrl, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.get(apiUrl + 'auth/getAllForm', {
        headers: {
          Authorization: token,
        },
      });
      resolve(resp.data.payload.forms);
    } catch (err) {
      console.log(err);
      reject();
    }
  });
};

export const createForm = (apiUrl, token, formName, formField) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.post(
        apiUrl + 'auth/createForm',
        {
          formName,
          fields: formField,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      resolve(resp.data.isFormCreated);
    } catch (err) {
      console.log(err);
    }
  });
};

export const deleteForm = (apiUrl, token, formName) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(apiUrl + 'auth/deleteForm?formName=hostel', {
        params: {
          formName,
        },
        headers: {
          Authorization: token,
        },
      });
      resolve();
    } catch (err) {
      console.log(err);
      reject();
    }
  });
};
