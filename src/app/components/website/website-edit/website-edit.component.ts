import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService} from '../../../services/website.service.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  userId: string;
  websites: any[];
  websiteId: string;
  website: any = {};
  errorFlag: boolean;
  errorMsg = 'Must have a name!';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private websiteService: WebsiteService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.websiteService.findWebsitesByUser(this.userId)
            .subscribe((websites: any[]) => {
              this.websites = websites;
            });
          this.websiteService.findWebsiteById(this.websiteId)
            .subscribe((website: any) => {
              this.website = website;
            });
        }
      );
  }

  updateWebsite() {
    if ( !this.website.name ) {
      this.errorFlag = true;
    } else {
      this.errorFlag = false;
      this.websiteService.updateWebsite(this.websiteId, this.website)
        .subscribe((website: any) => {
          this.router.navigate(['/user', this.userId, 'website']);
        });
    }
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId)
      .subscribe((website: any) => {
        this.router.navigate(['/user', this.userId, 'website']);
      });
  }
}
