import { Component, OnInit } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { UserService } from '../../user/user.service';
import { ProjectService } from '../../project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  profile: Profile;
  user: User;
  project: Project;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.project = localStorage.getItem('project') !== 'undefined' && JSON.parse(localStorage.getItem('project'));
  }
}
