const mongoose = require("mongoose");

// Define the Schema
const ProfileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: "",
    trim : true
  },
  lastname: {
    type: String,
    default: "",
    trim : true
  },
  age: {
    type: Number,
    default: 0
  },
  team: {
    type: String,
    default: "",
    trim: true
  },
  position: {
    type: String,
    default: "",
    trim : true
  }
});

//Define the model
module.exports = mongoose.model("Profile", ProfileSchema);
