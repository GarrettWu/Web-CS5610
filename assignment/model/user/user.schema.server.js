var mongoose = require('mongoose');
var db = mongoose.connection;

// const WebsiteSchema = require('../website/website.schema.server')
// const Website = db.model('Website', WebsiteSchema);


var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites: [mongoose.Schema.Types.ObjectId],
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'user'});

module.exports = UserSchema;
