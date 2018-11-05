import React from 'react';
import ReactDOM, { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import App from './components/app';
import ScrollToTop from './components/common/ScrollToTop/scrollToTop';
// import registerServiceWorker from './registerServiceWorker';
import './components/bundle.scss';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers, preloadedState, applyMiddleware(thunk));

const isFrontEnd = typeof window !== undefined; // eslint-disable-line
const renderMethod = isFrontEnd ? ReactDOM.render : hydrate;

renderMethod(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App dispatch={store.dispatch} />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// registerServiceWorker();
