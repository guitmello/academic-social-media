import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  @Input() projectId;
  project: Project;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getProjectInfo(this.projectId);
  }

  getProjectInfo(projectId) {
    this.projectService.getProjectInfo(projectId).subscribe(response => this.project);
  }

}
