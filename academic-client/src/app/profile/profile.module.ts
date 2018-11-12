import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDashComponent } from './profile-dash/profile-dash.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectModule } from '../project/project.module';
import { PostModule } from '../post/post.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectModule,
    PostModule
  ],
  declarations: [
    ProfileDashComponent,
    ProfileHeaderComponent,
  ],
  exports: [
    ProfileDashComponent,
    ProfileHeaderComponent
  ]
})
export class ProfileModule { }
