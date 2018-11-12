import { Component, OnInit, Output } from '@angular/core';
import { PostService } from '../../post/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-timeline-posts',
  templateUrl: './timeline-posts.component.html',
  styleUrls: ['./timeline-posts.component.css']
})
export class TimelinePostsComponent implements OnInit {

  @Output() userId: string;
  paramId: string;
  public posts: Post[] = [];
  @Output() post: Post;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.activatedRoute.params.subscribe(params => {
      this.paramId = params.id;
    });

    if (this.paramId && this.activatedRoute.snapshot.routeConfig.path === 'post') {
      this.getPost(this.paramId);
    } else if (this.paramId) {
      this.getUserPosts(this.paramId);
      this.getNewPost(this.posts);
    } else {
      this.getUserPosts(this.userId);
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
      this.posts = response;
      this.getNewPost(this.posts);
    });
  }

  getNewPost(posts) {
    return this.postService.newPost.subscribe(post => {
      posts.unshift(post);
    });
  }

}
