//require('dotenv').config();

const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  cors = require("cors"),
  mongoose = require("mongoose"),
  routes = require("./routes/main")

//dotenv doesn't working, temporary hardcode
mongoose.connect("mongodb://localhost:27017/barbearia");

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

routes(app);
app.listen(3000, () => {
  console.log("listening on 3000");
});
