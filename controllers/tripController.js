const db = require("../models");

module.exports = {
  findTripsFromUser: function (uid, cb) {
    db.User.findOne({ uid: uid }).then(user => {
      db.Trip.find({ owner: user._id }).then(cb);
    })
  },

  saveTrip: function (trip, cb) {
    if (trip._id) {
      db.Trip.update({ _id: trip._id }, trip, (err, raw) => {
        db.Trip.findById(trip._id, (err, res) => {
          cb(res);
        })
      })
    } else {
      db.Trip.create(trip, (err, doc) => {
        cb(doc);
      });
    }
  }
}