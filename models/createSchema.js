const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createSchema = (fields) => new Schema(fields, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});

module.exports = createSchema;