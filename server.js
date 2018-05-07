const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

app.use(cookieParser());
app.use(session({ secret: 'secret string xxxxxxx' }));
// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/dist'));

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
var assignment = require("./assignment/app");
assignment(app);

const port = process.env.PORT || 3100;
app.set('port', port);

const server = http.createServer(app);


app.listen(port);

