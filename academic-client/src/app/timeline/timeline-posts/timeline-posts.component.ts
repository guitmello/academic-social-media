import { Component, OnInit, Output } from '@angular/core';
import { PostService } from '../../post/post.service';

@Component({
  selector: 'app-timeline-posts',
  templateUrl: './timeline-posts.component.html',
  styleUrls: ['./timeline-posts.component.css']
})
export class TimelinePostsComponent implements OnInit {

  posts: Post[];
  @Output() post: Post;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getUserPosts('5be7bb0d6fd346302c658f7a').subscribe(response => {
      console.log(response);
      this.posts = response;
    });
  }

}
