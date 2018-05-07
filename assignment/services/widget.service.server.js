module.exports = function(app) {
  var widgetModel = require("../model/widget/widget.model.server")

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  function createWidget(req, res) {
    var pageId = req.params["pageId"];
    var widget = {
      type: req.body.widgetType,
      _page: pageId,
      size: req.body.size,
      width: req.body.width,
      text: req.body.text,
      url: req.body.url
    };

    widgetModel.createWidget(pageId, widget)
      .then(function (widget) {
        res.json(widget);
      })
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function (widgets) {
        res.json(widgets);
      })
  }

  function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      })
  }

  function updateWidget(req, res) {
    var widgetId = req.params.widgetId;

    var widget = {
      widgetType: req.body.widgetType,
      size: req.body.size,
      width: req.body.width,
      text: req.body.text,
      url: req.body.url
    };

    widgetModel.updateWidget(widgetId, widget)
      .then(function (widget) {
        res.json(widget);
      })
  }

  function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel.deleteWidget(widgetId)
      .then(function (widget) {
        res.json(widget);
      })
  }
}
