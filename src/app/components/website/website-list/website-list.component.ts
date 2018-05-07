import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService} from '../../../services/website.service.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  userId: string;
  websites: any[];

  constructor(private activatedRoute: ActivatedRoute, private websiteService: WebsiteService) { }
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

}
