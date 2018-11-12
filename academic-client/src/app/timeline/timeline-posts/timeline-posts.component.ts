import { Component, OnInit, Output } from '@angular/core';
import { PostService } from '../../post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthState } from '../../store/auth.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-timeline-posts',
  templateUrl: './timeline-posts.component.html',
  styleUrls: ['./timeline-posts.component.css']
})
export class TimelinePostsComponent implements OnInit {

  @Output() storeId: Observable<any>;
  paramId: string;
  public posts: Post[] = [];
  @Output() post: Post;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.paramId = params.id;
    });

    if (this.paramId && this.activatedRoute.snapshot.routeConfig.path === 'post') {
      this.getPost(this.paramId);
      this.getNewPost(this.posts);
    } else if (this.paramId) {
      this.getUserPosts(this.paramId);
      this.getNewPost(this.posts);
    } else {
      this.getUserId();
      this.getNewPost(this.posts);
    }

  }

  getPost(postId) {
    this.postService.getPost(postId).subscribe(response => {
      console.log(response);
      this.post = response;
    });
  }

  getUserPosts(userId) {
    this.postService.getUserPosts(userId).subscribe(response => {
      console.log(response);
      this.posts = response;
    });
  }

  getUserId() {
    this.storeId = this.store.select('auth').pipe(map(response  => {
      return response.user.userId;
    }));
    this.storeId.subscribe(userId => this.getUserPosts(userId));
  }

  getNewPost(posts) {
    return this.postService.newPost.subscribe(post => {
      posts.unshift(post);
      console.log(posts);
    });
  }

}
