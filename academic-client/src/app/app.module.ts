import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { PostModule } from '../components/post/post.module';

import { HeaderComponent } from '../components/header/header.component';
import { TimelineProjectComponent } from '../views/timeline-project/timeline-project.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LoginService } from './security/login/login.service';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule

} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ProfileDashComponent } from '../components/profile-dash/profile-dash.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    TimelineProjectComponent,
    HomeComponent,
    ProfileDashComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PostModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule

  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
