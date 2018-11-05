import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import routes from './routes';
import Header from './common/header/headerContainer';
import actions from '../redux/actions/index';
import Footer from './common/footer/footerContainer';

library.add(fab);
library.add(fas);

class App extends React.Component {
  componentDidMount() {
    const {
      store,
      dispatch,
    } = this.props;
    const { currentChapter } = store;
    const query = currentChapter ? `chapterUuid=${currentChapter.uuid}` : '';
    const resources = ['events', 'pages', 'members', 'chapters', 'locations', 'blogPosts', 'settings'];
    resources.forEach((resource) => {
      if (store[resource].list._list.length === 0) {
        // this is what initiates the fetching of data.
        // the resource will be read into a url with this scheme: http://:host.com/api/v1/:resource
        dispatch(actions.crudAction({ resource, query }));
      }
    });
  }
  render() {
    return (
      <div className="site-wrapper">
        <div>
          <Header key="header" />
          <Switch key="routes">
            {routes.map((route) => {
              const Component = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  render={() => (
                    <Component
                      loadData={route.loadData}
                    />
                  )}
                  exact={route.exact}
                />
              );
            })}
          </Switch>
        </div>

        <Footer key="footer" />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.shape({
    currentChapter: PropTypes.shape({}),
  }).isRequired,
};

App.defaultProps = {
};

export default connect(
  state => ({ store: state }),
  null,
  null,
  { pure: false },
)(App);
