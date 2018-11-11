import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  { path: '', component: UserAddEditComponent },
  { path: ':id', component: UserAddEditComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
