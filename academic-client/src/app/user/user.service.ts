import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs/observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  user: User;

  API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/users/${user._id}`, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.API_URL}/users/${user._id}`);
  }

  getFriends(userId): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/followers/${userId}`);
  }

}
