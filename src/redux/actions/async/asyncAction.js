const hostname = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

// accounts for development environment
const url = path => hostname + path;

// initializes with action type and store section affected, activated with status and bool
const status = (type, section) => (stat, bool) => ({
  type,
  section,
  status: stat,
  bool,
});

// initializes with action type and activated with a pkg
const success = type => pkg => ({
  type,
  pkg,
});

// initializes with action type and affected form, activated with error pkg {err:{...}}
const error = (type, form) => pkg => ({
  type,
  meta: { form },
  payload: { syncErrors: pkg.err },
});

const options = method => pkg => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('pi'),
  },
  body: JSON.stringify(pkg),
});

const actions = {
  authorize: {
    url: url('/api/v1/auth'),
    status: status('USERS_STATUS', 'auth'),
    success: success('AUTHORIZE_USER'),
    error: error('@@redux-form/UPDATE_SYNC_ERRORS', 'login'),
    options: options('POST'),
  },
  token: {
    url: url('/api/v1/token'),
    status: status('USERS_STATUS', 'auth'),
    success: success('AUTHORIZE_USER'),
    options: options('GET'),
  },
  newLocation: {
    url: url('/api/v1/locations'),
    status: status('POST_LOCATION', 'locations'),
    success: success('INSERT_LOCATION'),
    options: options('POST'),
  },
  editLocation: {
    url: url('/api/v1/locations'),
    status: status('PUT_LOCATION', 'locations'),
    success: success('EDIT_LOCATION'),
    options: options('PUT'),
  },
  deleteLocation: {
    url: url('/api/v1/locations'),
    status: status('DELETE_LOCATION', 'locations'),
    success: success('REMOVE_LOCATION'),
    options: options('DELETE'),
  },
  newUser: {
    url: url('/api/v1/register-user'),
    status: status('USER_STATUS', 'auth'),
    success: success('AUTHORIZE_USER'),
    options: options('POST'),
  },
  newEvent: {
    url: url('/api/v1/events'),
    status: status('POST_EVENT', 'events'),
    success: success('ADD_EVENT'),
    options: options('POST'),
  },
  editEvent: {
    url: url('/api/v1/events'),
    status: status('PUT_EVENT', 'events'),
    success: success('UPDATE_EVENT'),
    options: options('PUT'),
  },
  deleteEvent: {
    url: url('/api/v1/events'),
    status: status('DELETE_EVENT', 'events'),
    success: success('REMOVE_EVENT'),
    options: options('DELETE'),
  },
};

const asyncAction = (key, pkg, query = '', cb) => (dispatch) => {
  const newAction = actions[key];
  dispatch(newAction.status('loading', true));
  dispatch(newAction.status('error', false));
  fetch(newAction.url + (query ? `?${query}` : ''), newAction.options(pkg))
    .then((response) => {
      dispatch(newAction.status('loading', false));
      if (response.ok) {
        response.json().then((data) => {
          dispatch(newAction.success(data));
          if (cb) {
            cb(null, data);
          }
        });
      } else {
        response.json().then((data) => {
          if (newAction.error) {
            dispatch(newAction.error(data));
          } else {
            console.log('No error handling given for async action'); // eslint-disable-line
          }
          if (cb) {
            cb(data || { err: 'could not handle async action' });
          }
        });
      }
    })
    // figure out how to deal with server error
    .catch((error) => { // eslint-disable-line
      if (cb) {
        cb({ err: error });
      }
    });
};

export default asyncAction;
