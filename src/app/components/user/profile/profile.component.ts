import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { Router } from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // properties
  userId: string;
  user = {};
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  constructor(private router: Router, private userService: UserService,
              private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.user = this.sharedService.user || {};

        if ( this.user['username'] ) {
          this.username = this.user['username'];
        }

        if ( this.user['email'] ) {
          this.email = this.user['email'];
        }

        if ( this.user['firstName'] ) {
          this.firstName = this.user['firstName'];
        }

        if ( this.user['lastName'] ) {
          this.lastName = this.user['lastName'];
        }
      });

    // this.activatedRoute.params
    //   .subscribe(
    //     (params: any) => {
    //       this.userId = params['uid'];
    //     } );
    // // this.user = this.userService.findUserById(this.userId);
    // this.userService.findUserById(this.userId)
    //   .subscribe((user: any) => {
    //     this.user = user;
    //
    //     // alert(this.user['username']);
    //     this.username = this.user['username'];
    //
    //
    //     if ( this.user['email'] ) {
    //       this.email = this.user['email'];
    //     }
    //
    //     if ( this.user['firstName'] ) {
    //       this.firstName = this.user['firstName'];
    //     }
    //
    //     if ( this.user['lastName'] ) {
    //       this.lastName = this.user['lastName'];
    //     }
    //   });
  }

  updateUser() {
    this.user['username'] = this.username;
    this.user['email'] = this.email;
    this.user['firstName'] = this.firstName;
    this.user['lastName'] = this.lastName;
    this.userService.updateUser(this.userId, this.user)
      .subscribe((user: any) => {
        this.router.navigate(['/user', this.userId]);
      });
  }

  logout() {
    this.userService.logout()
      .subscribe((status) => {
        this.router.navigate(['/login']);
      });
  }
}
