import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../../services/page.service.client';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  userId: string;
  websiteId: string;
  pages: any[];

  constructor(private activatedRoute: ActivatedRoute, private pageService: PageService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageService.findPageByWebsiteId(this.websiteId)
            .subscribe((pages: any[]) => {
              this.pages = pages;
            });
        }
      );
  }
}
