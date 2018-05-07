import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()
export class PageService {
  constructor(private http: HttpClient) {}
  api = {
    'createPage' : this.createPage,
    'findPageByWebsiteId' : this.findPageByWebsiteId,
    'findPageById' : this.findPageById,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };
  createPage(websiteId, page) {
    const url = environment.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.post(url, page);
  }
  findPageByWebsiteId(websiteId) {
    const url = environment.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.get(url);
  }
  findPageById(pageId) {
    const url = environment.baseUrl + '/api/page/' + pageId;
    return this.http.get(url);
  }
  updatePage(pageId, page) {
    const url = environment.baseUrl + '/api/page/' + pageId;
    return this.http.put(url, page);
  }
  deletePage(pageId) {
    const url = environment.baseUrl + '/api/page/' + pageId;
    return this.http.delete(url);
  }
}
