const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const middlewares = require('./routes/middlewares');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const connectionString =
  "MONGODBCONNECTIONSTRING";

mongoose.connect(connectionString);

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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// routes
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
// Use checktoken middlaware for admin routes
// app.use('/message', middlewares.checkToken, messageRoutes);


app.listen(3000, () => {
  console.log("listening on 3000");
});
