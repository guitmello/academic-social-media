import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectViewComponent } from './project-view/project-view.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';
import { ProjectService } from './project.service';
import { PostService } from '../shared/post/post.service';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ],
  declarations: [
    ProjectViewComponent,
    ProjectAddEditComponent
  ],
  exports: [
    ProjectViewComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PostService
      ]
    }

  }
}
