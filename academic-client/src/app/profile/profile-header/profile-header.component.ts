import { Component, OnInit } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { UserService } from '../../user/user.service';
import { ProjectService } from '../../project/project.service';
import { Router } from '@angular/router';
import { PostService } from '../../post/post.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  profile: Profile;
  user: User;
  project: Project;

  projectPosts = [];
  userPosts = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.project = localStorage.getItem('project') !== 'undefined' && JSON.parse(localStorage.getItem('project'));

    this.getProjectPosts(this.project._id);
    this.getUserPosts(this.user._id);
  }

  getProjectPosts(projectId) {
    this.postService.getProjectPosts(projectId).subscribe(response => {
      this.projectPosts = response;
    });
  }

  getUserPosts(userId) {
    this.postService.getUserPosts(userId).subscribe(response => {
      this.userPosts = response;
    });
  }
}
