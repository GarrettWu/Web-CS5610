module.exports = function(app) {
  var pageModel = require("../model/page/page.model.server")

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function createPage(req, res) {
    var websiteId = req.params["websiteId"];
    var page = {
      name: req.body.name,
      websiteId: websiteId,
      description: req.body.description
    }
    pageModel.createPage(websiteId, page)
      .then(function(page) {
        res.json(page);
      })
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];

    pageModel.findAllPagesForWebsite(websiteId)
      .then(function (pages) {
        res.json(pages);
      })

  }

  function findPageById(req, res) {
    var pageId = req.params["pageId"];
    pageModel.findPageById(pageId)
      .then(function (page) {
        res.json(page);
      })
  }

  function updatePage(req, res) {
    var pageId = req.params["pageId"];

    var page = {
      name: req.body.name,
      description: req.body.description
    };

    pageModel.updatePage(pageId, page)
      .then(function (page) {
        res.json(page);
      })
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];

    pageModel.deletePage(pageId)
      .then(function (page) {
        res.json(page);
      })
  }
}
