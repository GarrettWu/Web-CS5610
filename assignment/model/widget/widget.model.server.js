var mongoose = require('mongoose');
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgets = findAllWidgets;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, widget) {
  widget._page = pageId;
  return WidgetModel.create(widget);
}

function findAllWidgets() {
  return WidgetModel.find();
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
  return WidgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  return WidgetModel.findOneAndUpdate({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
  return WidgetModel.findOneAndRemove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
  // asked Jhalaa, since this function is not used, we can leave it alone.
}
