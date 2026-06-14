const helmet = require('helmet');

module.exports = (app) => {
  app.disable('x-powered-by');

  app.use(helmet({
    referrerPolicy: { policy: 'no-referrer' }
  }));
};
