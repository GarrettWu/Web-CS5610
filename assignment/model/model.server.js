////
// Assignment database server
////

const connectionString = 'mongodb://localhost/assignment'; // for local
//  if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
//    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
//    var password = process.env.MLAB_PASSWORD_WEBDEV;
//    connectionString = 'mongodb://' + username + ':' + password;
//    connectionString += '@ds157268.mlab.com:57268/heroku_nh37fqq4'; // use yours
//  }

var mongoose = require('mongoose');
mongoose.connect(connectionString);
var db = mongoose.connection;

db.then(function() {
  console.log("connection success");
}).catch(function(err) {
  console.log("connection error");
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

module.exports = db;
