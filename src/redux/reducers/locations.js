import initialState from '../initialState';
import crudReducers from './default/crudReducer';

const locationCrudReducer = crudReducers('locations');
 const locations = (state = initialState().locations, action) => { // eslint-disable-line
  // override crud stuff here
  return locationCrudReducer(state, action);
};
export default locations;
