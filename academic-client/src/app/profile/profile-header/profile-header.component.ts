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

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.project = localStorage.getItem('project') !== 'undefined' && JSON.parse(localStorage.getItem('project'));

    this.getUserPosts(this.project._id);
  }

  getUserPosts(projectId) {
    this.postService.getProjectPosts(projectId).subscribe(response => {
      this.projectPosts = response;
    });
  }
}
