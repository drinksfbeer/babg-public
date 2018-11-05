import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import renderFullPage from './renderFullPage';
import App from '../../src/components/app';

const assetManifest = require.main.require('./build/asset-manifest.json');
const isDevelopment = process.env.NODE_ENV === 'development';
// assumes assetManifest can be found for production
const bundleUrl = isDevelopment ?
  // 'bundle.js' :
  '/static/js/bundle.js' :
  `/${assetManifest['main.js']}`;

const styleUrl = isDevelopment ? 'bundle.css' : 'static/css/bundle.css';

function handleResponseAndStore(req, res, store) {
  const context = {};
  const html = renderToString( // eslint-disable-line
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>,
  ); // eslint-disable-line
  const helmet = Helmet.renderStatic();
  const preloadedState = store.getState();

  if (context.url) {
    return res.redirect(context.url);
  }

  return res.send(renderFullPage({
    html,
    preloadedState,
    bundleUrl,
    helmet,
    styleUrl,
  }));
}

export default handleResponseAndStore;
