import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

const routes: Routes = [
  { path: '', component: UserAddEditComponent },
  { path: ':id', component: UserAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
