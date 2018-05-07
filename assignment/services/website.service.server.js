module.exports = function(app) {
  var websiteModel = require("../model/website/website.model.server")

  app.get('/api/website', findAllWebsites);
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  function findAllWebsites(req, res) {
    websiteModel.findAllWebsites()
      .then(function (websites) {
        res.json(websites);
      });
  }

  function createWebsite(req, res) {
    var userId = req.params["userId"];
    var website = {
      name: req.body.name,
      _user: userId,
      description: req.body.description
    }
    websiteModel.createWebsiteForUser(userId, website)
      .then(function(website) {
        res.json(website);
      });
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId)
      .then(function (websites) {
        res.json(websites);
      });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId)
      .then(function(website) {
        res.json(website);
      });
  }

  function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = {
      name: req.body.name,
      description: req.body.description,
    };

    websiteModel.updateWebsite(websiteId, website)
      .then(function (website) {
        res.json(website);
      });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel.deleteWebsite(websiteId)
      .then(function (website) {
        res.json(website);
      });
  }
}
