export const connectServer = (apiUrl, header) => {
  return fetch(apiUrl + 'connectClient', {
    method: 'POST',
    headers: {
      Authorization: header,
    },
    body: JSON.stringify({}),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.payload.token) {
        return data.payload.token;
      }
      return false;
    })
    .catch((err) => console.error(err.message));
};

export const getAllForms = (apiUrl, token) => {
  return fetch(apiUrl + 'auth/getAllForm', {
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

export const getForm = (apiUrl, token, formName) => {
  return fetch(apiUrl + 'auth/getForm?formName=' + formName, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (data.formRetrieved) {
        return data.form;
      }
      return false;
    })
    .catch((err) => console.error(err.message));
};

export const getValidate = (apiUrl, token) => {
  return fetch(apiUrl + 'auth/validators', {
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

export const createForm = (apiUrl, token, formName, formField, description) => {
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
  return fetch(apiUrl + 'auth/createForm', {
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

export const deleteForm = (apiUrl, token, formName) => {
  return fetch(apiUrl + 'auth/deleteForm?formName=' + formName, {
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
