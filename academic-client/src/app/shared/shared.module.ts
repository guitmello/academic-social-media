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
  MatDatepickerModule,
  MatDividerModule
} from '@angular/material';
import { ProfileDashComponent } from './profile/profile-dash/profile-dash.component';
import { ProfileHeaderComponent } from './profile/profile-header/profile-header.component';
import { TopRatedProject } from './top-rated-project/top-rated-project.component';
import { TimelineProjectComponent } from './timeline/timeline-project/timeline-project.component';
import { TimelinePostsComponent } from './timeline/timeline-posts/timeline-posts.component';
import { RouterModule } from '@angular/router';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { PostService } from './post/post.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
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
    MatNativeDateModule,
    MatDividerModule
  ],
  declarations: [
    ProfileDashComponent,
    ProfileHeaderComponent,
    TopRatedProject,
    TimelineProjectComponent,
    TimelinePostsComponent,
    PostDetailsComponent,
    NewPostComponent
  ],
  exports: [
    ProfileDashComponent,
    ProfileHeaderComponent,
    TopRatedProject,
    TimelineProjectComponent,
    TimelinePostsComponent,
    PostDetailsComponent,
    NewPostComponent,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
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
    MatNativeDateModule,
    MatDividerModule
  ],
  providers: [
    

  ]
})
export class SharedModule { }
