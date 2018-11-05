require('isomorphic-fetch');
const Promise = require('promise');

const HOST_NAME = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export const fetchApi = ({ url, body, method = 'GET' }, callback) => {
  const uri = HOST_NAME + url;
  fetch(uri, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        callback(null, data);
      });
    } else if (response.status === 400) {
      response.json().then((data) => {
        callback(data);
      });
    } else {
      callback({ err: 'response not ok' });
    }
  }).catch((error) => {
    console.log(error);
    callback(error);
  });
};

export const fetchPromise = ({
  hostName,
  url,
  body,
  method = 'GET',
}) => new Promise((resolve, reject) => {
  const catchCallback = (error) => {
    console.log(error);
    reject(new Error({ err: error }));
  };

  fetch((hostName || HOST_NAME) + url, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        resolve(data);
      }).catch(catchCallback);
    } else if (response.status === 400) {
      response.json().then((data) => {
        reject(new Error({ err: data }));
      }).catch(catchCallback);
    } else {
      reject(new Error({ err: 'response not ok' }));
    }
  }).catch(catchCallback);
});
