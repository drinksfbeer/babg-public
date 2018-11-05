/* eslint no-use-before-define: 0 */
/* eslint no-bitwise: 0 */

const crudReducers = resource => (state, action) => {
  const resourceType = resource.toUpperCase();
  if (action.type === `${resourceType}_STATUS`) return executeResourceStatus(state, action.section, action.status, action.bool);
  if (action.type === `GET_${resourceType}_SUCCESS`) return executeGetResourceSuccess(state, action.pkg);
  if (action.type === `POST_${resourceType}_SUCCESS`) return executePostResourceSuccess(state, action.pkg);
  if (action.type === `PUT_${resourceType}_SUCCESS`) return executePutResourceSuccess(state, action.pkg);
  if (action.type === `DELETE_${resourceType}_SUCCESS`) return executeDeleteResourceSuccess(state, action.pkg);
  return state;
};

const executeResourceStatus = (state, section, status, bool) => {
  const newState = state;
  newState[section][status] = bool;
  return newState;
};
const executeGetResourceSuccess = (state, pkg) => {
  const newState = state;
  newState.list.success = true;
  newState.list._list = pkg;
  return newState;
};
const executePostResourceSuccess = (state, pkg) => {
  const newState = state;
  newState.list.success = true;
  newState.list._list.push(pkg);
  return newState;
};
const executePutResourceSuccess = (state, pkg) => {
  const newState = state;
  const index = newState.list._list
    .map(item => item._id)
    .indexOf(pkg._id);
  if (~index) {
    newState.update.success = true;
    newState.list._list[index] = pkg;
  } else {
    newState.update.error = true;
    // console.warn('Returned Pkg Does Not Exist');
    // console.log(pkg);
  }
  return newState;
};
const executeDeleteResourceSuccess = (state, pkg) => {
  const newState = state;
  const index = newState.list._list
    .map(item => item._id)
    .indexOf(pkg._id);
  if (~index) {
    newState.list._list.splice(index, 1);
    newState.delete.success = true;
  } else {
    newState.delete.error = true;
  }
  return newState;
};

export default crudReducers;
