import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css']
})
export class ProjectAddEditComponent implements OnInit {

  isCreating = true;

  project: Project;

  projectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private activatedRouted: ActivatedRoute
  ) { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      description: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      projectProgress: new FormControl('', {
        validators: [Validators.required]
      }),
    });
  }

  createOrUpdate() {
    if (this.isCreating) {
      this.createProject(this.project);
    } else {
      this.updateProject(this.project);
    }
  }

  createProject(project: Project) {
    this.projectService.createProject(project).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  updateProject(project: Project) {
    this.projectService.updateProject(project).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
}
