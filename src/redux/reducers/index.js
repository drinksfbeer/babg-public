import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import users from './users/users';
import pages from './pages';
import events from './events';
import members from './members';
import chapters from './chapters';
import locations from './locations';
import blogPosts from './blogPosts';
import settings from './settings';

const appReducer = combineReducers({
  form,
  pages,
  blogPosts,
  users,
  events,
  members,
  chapters,
  locations,
  settings,
  currentChapter: (state = null) => state,
  development: (state = null) => state,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined; // eslint-disable-line
  }

  return appReducer(state, action);
};

export default rootReducer;
