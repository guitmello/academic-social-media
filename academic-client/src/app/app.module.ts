import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { PostModule } from '../components/post/post.module';

import { LoginComponent } from './security/login/login.component';
import { HeaderComponent } from '../components/header/header.component';
import { TimelineProjectComponent } from '../views/timeline-project/timeline-project.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LoginService } from './security/login/login.service';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    HeaderComponent,
    TimelineProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PostModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
