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
import { TimelineModule } from './timeline/timeline.module';
import { LoginComponent } from './security/login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ProfileModule,
    TimelineModule,
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
