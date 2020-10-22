require('dotenv').config();

const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  cors = require("cors"),
  mongoose = require("mongoose"),
  routes = require("./routes/main")

mongoose.connect(process.env.MONGO_CONNECTION_STRING);
routes(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.listen(3000, () => {
  console.log("listening on 3000");
});
