import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Profile } from 'selenium-webdriver/firefox';
import { ProjectService } from '../../project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dash',
  templateUrl: './profile-dash.component.html',
  styleUrls: ['./profile-dash.component.css']
})
export class ProfileDashComponent implements OnInit {

  @Output() projectId;
  profile: Profile;
  user: User;
  project: Project;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.getUser(userId);
    this.getProject(userId);
  }

  getUser(userId) {
    this.userService.getUser(userId).subscribe(response => this.user = response);
  }

  getProject(userId) {
    this.projectService.getProjectUser(userId).subscribe(response => this.projectId = response[0]._id);
  }

  goToProfile() {
    this.router.navigateByUrl(`user/profile/${this.user._id}`);
  }

}
