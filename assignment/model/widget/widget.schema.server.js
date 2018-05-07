var mongoose = require('mongoose');
var db = mongoose.connection;

// const PageSchema = require('../page/page.schema.server')
// const Page = db.model('Page', PageSchema);

var WidgetSchema = mongoose.Schema({
  _page: mongoose.Schema.Types.ObjectId,
  type: String,
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deletable: Boolean,
  formatted: Boolean,
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'widget'});

module.exports = WidgetSchema;
