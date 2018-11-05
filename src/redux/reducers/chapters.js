
import initialState from '../initialState';
import crudReducers from './default/crudReducer';


const chapterCrudReducer = crudReducers('chapters');

const chapters = (state = initialState().chapters, action) => { // eslint-disable-line
  // override crud stuff here
  return chapterCrudReducer(state, action);
};

export default chapters;
