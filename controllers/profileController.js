const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findById: function (req, res) {
    db.User.findOne({ uid: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => { console.log(err); res.status(422).json(err) });
  },
  create: function (req, res) {
    console.log("here")
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => { console.log(err); res.status(422).json(err) });
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ uid: req.params.id }, { $set: req.body }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
