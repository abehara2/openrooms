// Load required packages
var mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  token: { type: String, required: true }
});

// Define our user schema
var CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: {type: String, required: true},
  number: {type: String, required: true},
  rooms: {type: [RoomSchema], required: true}
});

// Export the Mongoose model
module.exports = mongoose.model("Course", CourseSchema);
//module.exports = mongoose.model("Room", RoomSchema);
