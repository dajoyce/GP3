const db = require("../models");

module.exports = {
  findTripsFromUser: function (ownerId, cb) {
    db.Trip.find({ owner: objectId }).then(cb);
  },

  addNodeToTrip: function (place, tripId) {
    db.Trip.findById(tripId, function (err, trip) {
      trip.nodes.push(place);
      trip.save();
    });
  }
}