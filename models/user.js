const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const createSchema = require("./createSchema");

var userSchema = createSchema({
  nome: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  genero: {
    type: String,
    required: false,
  },
  endereco: {
    type: String,
    required: false,
  },
  // messages: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Message'
  // }]
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userSchema);