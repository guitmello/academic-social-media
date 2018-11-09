import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { PostModule } from '../components/post/post.module';

import { HeaderComponent } from '../components/header/header.component';
import { TimelineProjectComponent } from '../views/timeline-project/timeline-project.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LoginService } from './security/login/login.service';
import { UserService } from './user/user.service';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressBarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ProfileDashComponent } from '../components/profile-dash/profile-dash.component';
import { NewPostComponent } from '../components/post/new-post/new-post.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    TimelineProjectComponent,
    HomeComponent,
    ProfileDashComponent,
    NewPostComponent,
    RankingComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PostModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressBarModule
  ],
  providers: [LoginService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
