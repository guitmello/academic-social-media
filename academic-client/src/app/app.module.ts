import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { TimelineModule } from './timeline/timeline.module';

import { LoginService } from './security/login/login.service';
import { UserService } from './user/user.service';

import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { HeaderComponent } from './header/header.component';
import { ProfileDashComponent } from './user/profile/profile-dash/profile-dash.component';
import { ProfileHeaderComponent } from './user/profile/profile-header/profile-header.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    HomeComponent,
    RankingComponent,
    ProfileDashComponent,
    ProfileHeaderComponent,
    RankingComponent,
  ],
  imports: [
    BrowserModule,
    TimelineModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [LoginService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
