import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-top-rated-project',
  templateUrl: './top-rated-project.component.html',
  styleUrls: ['./top-rated-project.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class TopRatedProject implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getTopRatedProjects().subscribe(response => {
      this.projects = response;
      this.projects.forEach(project => {
        project.photo = `http://localhost:8081${project.photo}`;
      });
    });
  }

}
