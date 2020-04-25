// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  school: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

// Export the Mongoose model
module.exports = mongoose.model("User", UserSchema);
