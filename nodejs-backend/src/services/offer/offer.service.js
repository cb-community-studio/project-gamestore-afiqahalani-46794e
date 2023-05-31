const { Offer } = require('./offer.class');
const createModel = require('../../models/offer.model');
const hooks = require('./offer.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/offer', new Offer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('offer');

  service.hooks(hooks);
};