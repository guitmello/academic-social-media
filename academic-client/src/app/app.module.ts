import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

<<<<<<< HEAD
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../components/header/header.component';
import { TimelineProjectComponent } from './views/timeline-project/timeline-project.component';
=======
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostModule } from './post/post.module';
>>>>>>> c09f3d7d0fe9ce647d68418e18c83cd0792cdd85

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
<<<<<<< HEAD
    LoginComponent,
    HeaderComponent,
    TimelineProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
=======
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
>>>>>>> c09f3d7d0fe9ce647d68418e18c83cd0792cdd85
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
