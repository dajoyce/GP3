const db = require("../models");

module.exports = {
  findTripsFromUser: function (ownerId, cb) {
    db.Trip.find({ owner: ownerId }).then(cb);
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