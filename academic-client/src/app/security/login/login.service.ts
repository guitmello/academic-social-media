import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginService {

  user: User;
  lastUrl: string;

  API_URL = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  isLoggedIn(): boolean {
    if (this.user) {
      localStorage.setItem('id', this.user._id);
      localStorage.setItem('token', this.user.token);
    }
    return this.user !== undefined;
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigateByUrl('/login');
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.API_URL}login`, {email: email, password: password})
      .pipe(
        tap(user => {
          this.user = user;
          console.log(this.user);
        })
      );
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }

}
