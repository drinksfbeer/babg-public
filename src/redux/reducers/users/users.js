/* eslint no-use-before-define: 0 */
/* eslint no-bitwise: 0 */

import initialState from '../../initialState';
import crudReducers from '../default/crudReducer';


const userCrudReducer = crudReducers('users');

const users = (state = initialState().users, action) => {
  // override crud stuff here
  if (action.type === 'AUTHORIZE_USER') return executeAuthorizeUser(state, action.pkg);
  if (action.type === 'USER_STATUS') return executePostUser(state, action.section, action.status, action.bool);
  return userCrudReducer(state, action);
};

const executePostUser = (state, section, status, bool) => {
  const newState = state;
  newState[section][status] = bool;
  return { ...state, newState };
};

const executeAuthorizeUser = (state, pkg) => {
  const newState = state;
  newState.auth.user = pkg;
  localStorage.setItem('pi', pkg.password);
  newState.auth.authorized = true;
  return { ...state, newState };
};

export default users;
