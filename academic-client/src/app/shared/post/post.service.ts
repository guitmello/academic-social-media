import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Observable } from 'rxjs/observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PostService {

  post: Post;

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private postService: PostService) { }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.API_URL}/posts`, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.API_URL}/posts/${post._id}`, post);
  }

  deletePost(post: Post): Observable<Post> {
    return this.http.delete<Post>(`${this.API_URL}/posts/${post._id}`);
  }
}
