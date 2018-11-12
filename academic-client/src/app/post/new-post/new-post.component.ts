import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../../user/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  @Input() userId;
  @Input() projectId;

  id: string;
  post: Post = {
    content: '',
    projectId: '',
    user: {
      _id: '',
    name: '',
    photo: '',
    }
  };
  user: User;

  constructor(
    private postService: PostService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      content: new FormControl('', { })
    });
    if (this.userId) {
      this.getUser(this.userId);
    } else {
      this.getUser(localStorage.getItem('userId'));
      this.post.projectId = this.projectId;
    }
  }

  getUser(userId) {
    this.userService.getUser(userId).subscribe(response => {
      this.post.user._id = response._id;
      this.post.user.name = response.name;
      this.post.user.photo = response.photo;
    });
  }

  publish() {
    this.publishPost(this.post);
  }

  publishPost(post: Post) {
    this.postService.createPost(this.post).subscribe(response => {
      this.postService.postPublished(response);
      this.postForm.reset();
    });
  }

}
