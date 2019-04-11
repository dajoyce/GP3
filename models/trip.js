const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripScema = new Schema({
  nodes: [{
    place: String,
    lat: Number,
    lng: Number,
    photo: String
  }],
  name: String,
  notes: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Trip = mongoose.model("Trip", tripScema);

module.exports = Trip;
