import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { TopRatedProject } from './top-rated-project/top-rated-project.component';
import { ProjectService } from './project.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ProjectAddEditComponent,
    ProjectInfoComponent,
    ProjectViewComponent,
    TopRatedProject
  ],
  exports: [
    ProjectAddEditComponent,
    ProjectInfoComponent,
    ProjectViewComponent,
    TopRatedProject
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule { }
