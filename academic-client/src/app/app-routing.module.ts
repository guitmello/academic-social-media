import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './security/login/login.module#LoginModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
