import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../../services/page.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: string;
  websiteId: string;
  name: string;
  description: string;
  errorFlag: boolean;
  errorMsg = 'Must have a name!';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private pageService: PageService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
      );
  }

  createPage() {
    if ( !this.name ) {
      this.errorFlag = true;
    } else {
      this.errorFlag = false;
      this.pageService.createPage(this.websiteId, {'name': this.name, 'description': this.description})
        .subscribe((page: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
        });
    }
  }
}
