
import initialState from '../initialState';
import crudReducers from './default/crudReducer';


const eventCrudReducer = crudReducers('events');

const events = (state = initialState().events, action) => { // eslint-disable-line
  // override crud stuff here
  return eventCrudReducer(state, action);
};

export default events;
