const Tought = require('../models/Tought');
const User = require('../models/User');

class ToughtsController {

  static async showAll(req, res, next) { }

  static async showToughts(req, res, next) {
    res.render('toughts/home');
  }
}

module.exports = ToughtsController;