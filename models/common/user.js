const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const createSchema = require("../createSchema");

var userSchema = createSchema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  isBarber: {
    type: Boolean,
    required: true
  }
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userSchema);