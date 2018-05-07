import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()
export class WebsiteService {
  constructor(private http: HttpClient) {}
  api = {
    'createWebsite' : this.createWebsite,
    'findWebsitesByUser' : this.findWebsitesByUser,
    'findWebsiteById' : this.findWebsiteById,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };
  createWebsite(userId, website) {
    const url = environment.baseUrl + '/api/user/' + userId + '/website';
    return this.http.post(url, website);
  }
  findWebsitesByUser(userId) {
    const url = environment.baseUrl + '/api/user/' + userId + '/website';
    return this.http.get(url);
  }
  findWebsiteById(websiteId) {
    const url = environment.baseUrl + '/api/website/' + websiteId;
    return this.http.get(url);
  }
  updateWebsite(websiteId, website) {
    const url = environment.baseUrl + '/api/website/' + websiteId;
    return this.http.put(url, website);
  }
  deleteWebsite(websiteId) {
    const url = environment.baseUrl + '/api/website/' + websiteId;
    return this.http.delete(url);
  }
}
