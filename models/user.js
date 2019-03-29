const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // image: { type: Text, required: false },
  username: { type: String, required: true },
  uid: { type: String, required: true },
  email: { type: String, required: true }
});

// const tripSchema = new Schema({
//   trip: { type: Array, required: false }
// });

const User = mongoose.model("User", userSchema);

// const Trip = mongoose.model("Trip", tripSchema);

module.exports = User;
// module.exports = Trip;
