import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {SharedService} from './shared.service.client';
// injecting service into module
@Injectable()

export class UserService {
  options: RequestOptions = new RequestOptions();
  constructor(private http: Http, private router: Router, private sharedService: SharedService, private httpClient: HttpClient) { }
  api = {
    'createUser' : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'findUserByCredentials' : this.findUserByCredentials,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };
  register(username, password) {
    const url = environment.baseUrl + '/api/register';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }
  login(username, password) {
    const url = environment.baseUrl + '/api/login';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        console.log(response.json());

        return response.json();
      });
  }
  logout() {
    const url = environment.baseUrl + '/api/logout';
    this.options.withCredentials = true;
    return this.http.post(url, '', this.options)
      .map((status) => {
        return status;
      });
  }
  loggedIn() {
    const url = environment.baseUrl + '/api/loggedIn';
    this.options.withCredentials = true;
    return this.http.post(url, '', this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user;
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
  createUser(user: any) {
    const url = environment.baseUrl + '/api/user';
    return this.httpClient.post(url, user);
  }
  findUserById(userId: string) {
    const url = environment.baseUrl + '/api/user/' + userId;
    return this.httpClient.get(url);
  }
  findUserByUsername(username: string) {
    const url = environment.baseUrl + '/api/user?username=' + username;
    return this.httpClient.get(url);
  }
  findUserByCredentials(username: string, password: string) {
    const url = environment.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this.httpClient.get(url);
  }
  updateUser(userId, user) {
    const url = environment.baseUrl + '/api/user/' + userId;
    return this.httpClient.put(url, user);
  }
  deleteUser(userId) {
    const url = environment.baseUrl + '/api/user/' + userId;
    return this.httpClient.delete(url);
  }



}
