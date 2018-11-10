import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [UserAddEditComponent]
})
export class UserModule { }
