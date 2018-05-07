import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetService } from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widget: any;
  errorFlag: boolean;
  errorMsg = 'Must have a name!';

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        }
      );
  }

  createWidget(widgetType: string) {
    if ( !this.widget.name ) {
      this.errorFlag = true;
    } else {
      this.errorFlag = false;

      this.widgetService.createWidget(this.pageId, {widgetType: widgetType})
        .subscribe((widget: any) => {
          this.widget = widget;

          let type: string;
          if (widgetType === 'HEADING') {
            type = 'header';
          } else if (widgetType === 'IMAGE') {
            type = 'image';
          } else if (widgetType === 'YOUTUBE') {
            type = 'youtube';
          }

          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', widget._id, type]);
        });
    }
  }

}
