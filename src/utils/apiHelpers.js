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
