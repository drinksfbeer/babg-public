
import initialState from '../initialState';
import crudReducers from './default/crudReducer';


const memberCrudReducer = crudReducers('members');

const members = (state = initialState().members, action) => { // eslint-disable-line
  // override crud stuff here
  return memberCrudReducer(state, action);
};

export default members;
