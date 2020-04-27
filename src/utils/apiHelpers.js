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
