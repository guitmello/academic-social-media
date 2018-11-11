import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  user: User;
  lastUrl: string;

  API_URL = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  isLoggedIn() {
    return true;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.API_URL}login`, {email: email, password: password});
  }

  logout() {
    localStorage.removeItem('token');
  }

}
