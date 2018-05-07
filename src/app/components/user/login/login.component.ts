import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service.client';
import { Router } from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  // properties
  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) {}

  ngOnInit() {}

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    // this.userService.findUserByCredentials(this.username, this.password)
    //   .subscribe(
    //     (user: any) => {
    //       if ( user && user._id ) {
    //         this.errorFlag = false;
    //         this.router.navigate(['/user', user._id]);
    //       } else {
    //         this.errorFlag = true;
    //       }
    //     },
    //     (error: any) => {
    //       this.errorFlag = true;
    //     }
    //   );

    this.userService
      .login(this.username, this.password)
      .subscribe((user) => {
        this.sharedService.user = user;
        this.router.navigate(['/user']);
      });

    }
  }
