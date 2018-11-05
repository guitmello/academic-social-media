import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user/user.model';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  user: User;
  lastUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    if (this.user) {
      localStorage.setItem('id', this.user.id);
      localStorage.setItem('token', 'jwt ' + this.user.token);
    }
    return this.user !== undefined;
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigateByUrl('/login');
  }

}
