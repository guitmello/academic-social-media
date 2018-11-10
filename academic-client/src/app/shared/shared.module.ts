import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressBarModule,
  MatTabsModule,
  MatDatepickerModule
} from '@angular/material';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ProfileDashComponent } from './profile/profile-dash/profile-dash.component';
import { ProfileHeaderComponent } from './profile/profile-header/profile-header.component';
import { TopRatedProject } from './top-rated-project/top-rated-project.component';
import { TimelineProjectComponent } from './timeline/timeline-project/timeline-project.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatOptionModule,
    MatNativeDateModule
  ],
  declarations: [
    UserProfileComponent,
    ProfileDashComponent,
    ProfileHeaderComponent,
    TopRatedProject,
    TimelineProjectComponent
  ],
  exports: [
    UserProfileComponent,
    ProfileDashComponent,
    ProfileHeaderComponent,
    TopRatedProject,
    TimelineProjectComponent,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatOptionModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
