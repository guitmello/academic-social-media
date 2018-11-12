import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { environment } from '../../environments/environment';

@Injectable()
export class PostService {

  post: Post;
  newPost = new EventEmitter<Post>();

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserPosts(userId): Observable<Post[]> {
    let headers;

    if (localStorage.getItem('token')) {
      headers = new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      });
    }

    return this.http.get<Post[]>(`${this.API_URL}posts/users/${userId}`, { headers });
  }

  getProjectPosts(projectId): Observable<Post[]> {
    let headers;

    if (localStorage.getItem('token')) {
      headers = new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      });
    }

    return this.http.get<Post[]>(`${this.API_URL}posts/projects/${projectId}`, { headers });
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

  postPublished(post) {
    return this.newPost.emit(post);
  }
}
