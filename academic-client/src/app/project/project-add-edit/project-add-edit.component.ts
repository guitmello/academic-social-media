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

  project: Project = {
    name: '',
    photo: '',
    description: '',
    loading: 0,
    userId: localStorage.getItem('userId')
  };

  projectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.getProject(params.id);
        this.isCreating = false;
      }
    });

    this.projectForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      description: new FormControl('', {
        validators: [Validators.required]
      }),
      loading: new FormControl('', {
        validators: [Validators.required]
      }),
    });

    this.changePhoto();
  }

  // Photo Upload
  changePhoto() {
    document.querySelector('#imgupload').addEventListener('change', function() {
      const filesSelected = (<HTMLInputElement>(
        document.getElementById('imgupload')
      )).files;
      if (filesSelected.length > 0) {
        const fileToLoad = filesSelected[0];
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadEvent) {
          const base64value = <FileReader>event.target;
          console.log(base64value);
          (<HTMLInputElement>document.getElementById('imgupload')).setAttribute(
            'base64-value', base64value.result.toString()
          );
        };
        fileReader.readAsDataURL(fileToLoad);
      }
    });
  }

  setPhoto(url, callback): any {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  async createOrUpdate() {
    const fotobase64 = (<HTMLInputElement>document.getElementById('imgupload')).getAttribute('base64-value');
    console.log(fotobase64);

    if (!fotobase64) {
      this.project.photo = await this.setPhoto('../../../assets/images/meu-projeto.png', (dataUrl) => dataUrl.toString);
    } else {
      this.project.photo = fotobase64;
    }

    if (this.isCreating) {
      this.createProject(this.project);
    } else {
      this.updateProject(this.project);
    }
  }

  createProject(project: Project) {
    this.projectService.createProject(project).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/');
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

  getProject(projectId) {
    this.projectService.getProjectInfo(projectId).subscribe(response => this.project = response);
  }
}
