import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileModule } from './profile/profile.module';
import { LoginComponent } from './security/login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { TimelineViewComponent } from './timeline/timeline-view/timeline-view.component';
import { TimelinePostsComponent } from './timeline/timeline-posts/timeline-posts.component';
import { TimelineProjectComponent } from './timeline/timeline-project/timeline-project.component';
import { PostModule } from './post/post.module';
import { ProjectModule } from './project/project.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    LoginComponent,
    TimelineViewComponent,
    TimelinePostsComponent,
    TimelineProjectComponent
  ],
  imports: [
    BrowserModule,
    ProfileModule,
    PostModule,
    ProjectModule,
    SharedModule.forRoot(),
    StoreModule.forRoot(
      {auth: authReducer}
    ),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
