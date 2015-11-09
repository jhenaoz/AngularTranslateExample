/**
 * Main application routes
 */

'use strict';

module.exports = function (app) {

  // Insert routes below
  app.use('/api/v1/patient', require('./api/patient'));
  app.use('/api/v1/user', require('./api/user'));
  app.use('/api/v1/config', require('./api/config'));


  // All undefined asset or api routes should return a 404
    // app.route('/:url(api|auth|components|app|bower_components|assets|fonts)/*')
    //     .get(errors[404]);
};
