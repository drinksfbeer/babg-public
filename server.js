process.env.TZ = 'America/Los_Angeles';
const mongoose = require('mongoose');
const express = require('express');
const config = require('./config/server');
const handleRender = require('./build-server/server/reactServer/handleRender');
mongoose.Promise = require('bluebird');

const isDevelopment = process.env.NODE_ENV === 'development';
const mongooseOptions = {
  useNewUrlParser: true,
};

mongoose.connect(
  config.mongoUri,
  mongooseOptions,
);
const app = express();

require('./server/middleware')(app);

app.get('/', handleRender);
app.use(express.static('build'));

if (isDevelopment) {
  const proxy = require('http-proxy-middleware');
  app.use(express.static('build-server/bundle'));
  app.use(['/static', '/sockjs-node'], proxy({
    target: `http://localhost:${3001}`,
    ws: true,
    logLevel: 'error',
  }));
}

app.get('*', handleRender);

app.listen(config.port, () => {
  console.log('app listening on', config.port); // eslint-disable-line 
});
