import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service.client';
import { Router, ActivatedRoute } from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;

  username: string;
  password: string;
  verifyPassword: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) {}

  ngOnInit() {
  }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;

    if ( !this.password || this.password !== this.verifyPassword ) {
      this.errorMsg = 'Passwords do not match!';
      this.errorFlag = true;
    } else {
      this.userService.register(this.username, this.password)
        .subscribe((user) => {
          this.sharedService.user = user;
          this.router.navigate(['/user']);
        });
      // this.userService.findUserByUsername(this.username)
      //   .subscribe(
      //     (user: any) => {
      //       if ( user && user._id ) {
      //         this.errorMsg = 'Username existed!';
      //         this.errorFlag = true;
      //       } else {
      //         this.errorFlag = false;
      //         this.userService.createUser({'username': this.username, 'password': this.password})
      //           .subscribe((newUser: any) => {
      //             this.router.navigate(['/user', newUser._id]);
      //           });
      //       }
      //     },
      //     (error: any) => {
      //       this.errorFlag = true;
      //     }
      //   );
    }
  }
}
