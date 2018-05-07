var mongoose = require('mongoose');
var db = mongoose.connection;

// const WebsiteSchema = require('../website/website.schema.server')
// const Website = db.model('Website', WebsiteSchema);
// const WidgetSchema = require('../widget/widget.schema.server')
// const Widget = db.model('Widget', WidgetSchema);

var PageSchema = mongoose.Schema({
  _website: mongoose.Schema.Types.ObjectId,
  name: String,
  title: String,
  description: String,
  widgets: [mongoose.Schema.Types.ObjectId],
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'page'});

module.exports = PageSchema;
