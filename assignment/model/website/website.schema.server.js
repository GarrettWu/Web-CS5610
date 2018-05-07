var mongoose = require('mongoose');
var db = mongoose.connection;

// const UserSchema = require('../user/user.schema.server')
// const User = db.model('User', UserSchema);
// const PageSchema = require('../page/page.schema.server')
// const Page = db.model('Page', PageSchema);

var WebsiteSchema = mongoose.Schema({
  _user: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  pages: [mongoose.Schema.Types.ObjectId],
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'website'});

module.exports = WebsiteSchema;
