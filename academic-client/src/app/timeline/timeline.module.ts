import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelinePostsComponent } from './timeline-posts/timeline-posts.component';
import { PostModule } from '../post/post.module';
import { SharedModule } from '../shared/shared.module';
import { TimelineViewComponent } from './timeline-view/timeline-view.component';
import { ProfileModule } from '../profile/profile.module';
import { ProjectModule } from '../project/project.module';
import { TimelineProjectComponent } from './timeline-project/timeline-project.component';

@NgModule({
  imports: [
    CommonModule,
    PostModule,
    ProfileModule,
    ProjectModule,
    SharedModule
  ],
  declarations: [
    TimelinePostsComponent,
    TimelineViewComponent,
    TimelineProjectComponent
  ],
  exports: [
    TimelinePostsComponent,
    TimelineViewComponent,
    TimelineProjectComponent
  ]
})
export class TimelineModule { }
