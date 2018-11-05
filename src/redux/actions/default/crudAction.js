require('isomorphic-fetch');

const envHostName = process.env.REACT_APP_HOST_NAME;
// const envHostName = 'http://localhost:3002';
const hostname = envHostName || 'https://sfbeer-portal.herokuapp.com';

const storeType = {
  get: 'list',
  post: 'form',
  put: 'update',
  delete: 'delete',
};

const crudActionator = (type, resource) => ({
  url(query = '') {
    return `${hostname}/api/v1/${resource}${query ? `?${query}` : ''}`;
  },
  status(status, bool) {
    return {
      type: `${resource.toUpperCase()}_STATUS`,
      section: storeType[type.toLowerCase()],
      status,
      bool,
    };
  },
  success(data) {
    return {
      type: `${type.toUpperCase()}_${resource.toUpperCase()}_SUCCESS`,
      pkg: data,
    };
  },
  error(data) {
    return {
      type: '@@redux-form/UPDATE_SYNC_ERRORS',
      meta: {
        form: resource,
      },
      payload: {
        syncErrors: data.err,
      },
    };
  },
});


// ex: {type:"put","resource:"articles",pkg:{_id:"..",changes:{..}}}
const crudAction = ({ type = 'get', resource, query }, pkg, callback) => (dispatch) => {
  const authKey = typeof window === 'undefined' ? '' : localStorage.getItem('pi');
  const newAction = crudActionator(type, resource);
  dispatch(newAction.status('loading', true));
  dispatch(newAction.status('error', false));
  fetch(newAction.url(query), {
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authKey,
    },
    body: pkg ? JSON.stringify(pkg) : undefined,
  }).then((response) => {
    dispatch(newAction.status('loading', false));
    if (response.ok) {
      response.json().then((data) => {
        if (callback) {
          callback(null, data);
        }
        dispatch(newAction.success(data));
      });
    } else {
      response.json().then((data) => {
        if (callback) {
          callback(null, data);
        }
        dispatch(newAction.error(data));
      }).catch(err => console.log(err)); // eslint-disable-line
    }
  })
    .catch(error => console.log(error)); // eslint-disable-line
};


export default crudAction;
