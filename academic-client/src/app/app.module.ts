import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { TimelineModule } from './timeline/timeline.module';
import { ProjectModule } from './project/project.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ProfileModule,
    PostModule,
    TimelineModule,
    ProjectModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
