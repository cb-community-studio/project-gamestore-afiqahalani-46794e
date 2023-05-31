const users = require("./users/users.service.js");
const account = require("./account/account.service.js");
const cart = require("./cart/cart.service.js");
const game = require("./game/game.service.js");
const offer = require("./offer/offer.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(account);
  app.configure(cart);
  app.configure(game);
  app.configure(offer);
  // ~cb-add-configure-service-name~
};
