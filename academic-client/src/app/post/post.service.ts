import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { environment } from '../../environments/environment';

@Injectable()
export class PostService {

  post: Post;

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserPosts(userId): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}posts/users/${userId}`);
  }

  getProjectPosts(projectId): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}posts/users/${projectId}`);
  }

  getPost(userId): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}posts/${userId}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.API_URL}posts`, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.API_URL}posts/${post._id}`, post);
  }

  deletePost(post: Post): Observable<Post> {
    return this.http.delete<Post>(`${this.API_URL}posts/${post._id}`);
  }
}
