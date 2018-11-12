import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnChanges {

  @Input() post: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.post.user.photo = `${this.post.user.photo}`;
  }

}
