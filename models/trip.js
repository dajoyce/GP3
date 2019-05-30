const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
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

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
