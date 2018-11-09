import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs/observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  user: User;

  API_URL = environment.apiUrl;
  urlCreate = '';
  urlUpdate = '';
  urlFriends = '';

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}${this.urlCreate}`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}${this.urlUpdate}`, user);
  }

  getFriends(userId): Observable<any> {
    return this.http.get<any>(`${this.API_URL}${this.urlFriends}`);
  }
}
