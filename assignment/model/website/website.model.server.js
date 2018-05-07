var mongoose = require('mongoose');
var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsites = findAllWebsites;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;



module.exports = WebsiteModel;

function createWebsiteForUser(userId, website) {
  website._user = userId;
  return WebsiteModel.create(website);
}

function findAllWebsites() {
  return WebsiteModel.find();
}

function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
  return WebsiteModel.findOneAndUpdate({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
  return WebsiteModel.findOneAndRemove({_id: websiteId});
}
