import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserProfileComponent } from '../shared/profile/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: UserAddEditComponent },
  { path: ':id', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
