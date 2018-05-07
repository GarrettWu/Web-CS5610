import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()
export class WidgetService {
  constructor(private http: HttpClient) {}
  api = {
    'createWidget' : this.createWidget,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'findWidgetById' : this.findWidgetById,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };
  createWidget(pageId, widget) {
    const url = environment.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.post(url, widget);
  }
  findWidgetsByPageId(pageId) {
    const url = environment.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url);
  }
  findWidgetById(widgetId) {
    const url = environment.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url);
  }
  updateWidget(widgetId, widget) {
    const url = environment.baseUrl + '/api/widget/' + widgetId;
    return this.http.put(url, widget);
  }
  deleteWidget(widgetId) {
    const url = environment.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url);
  }
}
