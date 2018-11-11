import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './security/auth.guard';
import { TimelineViewComponent } from './timeline/timeline-view/timeline-view.component';
import { TimelineProjectComponent } from './timeline/timeline-project/timeline-project.component';
import { TimelinePostsComponent } from './timeline/timeline-posts/timeline-posts.component';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full', canActivate: [AuthGuard], },
  // { path: '/home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: TimelineViewComponent, children: [
    {path: '', redirectTo: 'posts', pathMatch: 'full'},
    {path: 'posts', component: TimelinePostsComponent, canActivate: [AuthGuard]},
    {path: 'project/:id', component: TimelineProjectComponent, canActivate: [AuthGuard]}
  ], canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
