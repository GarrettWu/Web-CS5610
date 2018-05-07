import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService} from '../../../services/website.service.client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: string;
  websites: any[];
  name: string;
  description: string;
  errorFlag: boolean;
  errorMsg = 'Must have a name!';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private websiteService: WebsiteService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteService.findWebsitesByUser(this.userId)
            .subscribe((websites: any[]) => {
              this.websites = websites;
            });
        }
      );
  }

  createWebsite() {
    if ( !this.name ) {
      this.errorFlag = true;
    } else {
      this.errorFlag = false;
      this.websiteService.createWebsite(this.userId, {'name': this.name, 'description': this.description})
        .subscribe((website: any) => {
          this.router.navigate(['/user', this.userId, 'website']);
        });
    }
  }
}
