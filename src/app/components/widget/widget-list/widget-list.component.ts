import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from '../../../services/widget.service.client';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgets: any[];
  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        }
      );
    this.widgetService.findWidgetsByPageId(this.pageId)
      .subscribe((widgets: any[]) => {
        this.widgets = widgets;
      });
  }

  embedURL(url: string) {
    const urlSegments = url.split('/');
    const embeddedUrl = 'https://www.youtube.com/embed/' + urlSegments.pop();
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl));
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }


}
