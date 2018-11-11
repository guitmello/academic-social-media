import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

}
