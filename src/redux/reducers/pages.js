
import initialState from '../initialState';
import crudReducers from './default/crudReducer';


const pageCrudReducer = crudReducers('pages');

const pages = (state = initialState().pages, action) => { // eslint-disable-line
  // override crud stuff here
  return pageCrudReducer(state, action);
};

export default pages;
