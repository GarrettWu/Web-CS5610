import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  name: string;
  text: string;
  size: number;

  errorFlag: boolean;
  errorMsg = 'Must have a name!';

  constructor(private router: Router, private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
          this.widgetService.findWidgetById(this.widgetId)
            .subscribe((widget: any) => {
              this.widget = widget;
              this.name = widget.name;
              this.text = widget.text;
              this.size = widget.size;
            });
        }
      );
  }

  updateWidget() {
    this.widget.name = this.name;
    this.widget.text = this.text;
    this.widget.size = this.size;

    if ( !this.widget.name ) {
      this.errorFlag = true;
    } else {
      this.errorFlag = false;
      this.widgetService.updateWidget(this.widgetId, this.widget)
        .subscribe((widget: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe((widget: any) => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
      });
  }
}
