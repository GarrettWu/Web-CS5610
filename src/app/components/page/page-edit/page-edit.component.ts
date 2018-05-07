import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../../services/page.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  page: any = {};
  errorFlag: boolean;
  errorMsg = 'Must have a name!';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private pageService: PageService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.pageService.findPageById(this.pageId)
            .subscribe((page: any) => {
              this.page = page;
            });
        }
      );
  }

  updatePage() {
    if ( !this.page.name ) {
      this.errorFlag = true;
    } else {
      this.errorFlag = false;
      this.pageService.updatePage(this.pageId, this.page)
        .subscribe((page: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
        });
    }
  }

  deletePage() {
    this.pageService.deletePage(this.pageId)
      .subscribe((page: any) => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
      });
  }

}
