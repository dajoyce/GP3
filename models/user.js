const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // image: { type: Text, required: false },
  uid: { type: String, required: true, index: true },
  email: { type: String, required: true },
  name: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
