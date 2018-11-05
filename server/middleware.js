const bodyParser = require('body-parser');
const compression = require('compression');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    console.log(req.url); // eslint-disable-line
    res.header('Access-Control-Allow-Origin', '*'); // replace this before launch
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    next();
  });
  app.use(compression());
};
