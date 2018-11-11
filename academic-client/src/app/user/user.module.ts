import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './user.service';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectModule } from '../project/project.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ProfileModule,
    ProjectModule
  ],
  declarations: [
    UserAddEditComponent,
    UserProfileComponent
  ],
  providers: [UserService]
})
export class UserModule { }
