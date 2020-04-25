// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  token: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model("Room", RoomSchema);
