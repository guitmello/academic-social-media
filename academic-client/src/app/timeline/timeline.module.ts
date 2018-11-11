import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelinePostsComponent } from './timeline-posts/timeline-posts.component';
import { PostModule } from '../post/post.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PostModule,
    SharedModule
  ],
  declarations: [
    TimelinePostsComponent
  ],
  exports: [
    TimelinePostsComponent
  ]
})
export class TimelineModule { }
