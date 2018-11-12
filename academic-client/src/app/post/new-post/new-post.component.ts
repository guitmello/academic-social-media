import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  @Input() userId;
  id: string;
  post: Post = {
    content: '',
    user: {
      _id: '',
    name: '',
    photo: ','
    }
  };
  user: User;

  constructor(
    private postService: PostService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.getUser(this.userId);
  }

  getUser(userId) {
    this.userService.getUser(userId).subscribe(response => {
      this.post.user._id = response._id;
      this.post.user.name = response.name;
      this.post.user.photo = response.photo;
      console.log(this.post.user);
    });
  }

  publish() {
    this.publishPost(this.post);
  }

  publishPost(post: Post) {
    this.postService.createPost(this.post).subscribe(response => {
      this.postService.postPublished(this.post);
    });
  }

}
