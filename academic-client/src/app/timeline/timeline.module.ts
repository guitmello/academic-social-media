import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineProjectComponent } from './timeline-project/timeline-project.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    TimelineRoutingModule,
    SharedModule
  ],
  declarations: [
    TimelineProjectComponent,
    PostDetailsComponent,
    NewPostComponent
  ],
  exports: [
    TimelineProjectComponent,
    PostDetailsComponent,
    NewPostComponent
  ]
})
export class TimelineModule { }
