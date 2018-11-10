import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostDetailsComponent } from './post-details/post-details.component';
import { SharedModule } from '../shared/shared.module';
import { NewPostComponent } from './new-post/new-post.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    PostDetailsComponent,
    NewPostComponent
  ],
  exports: [
    PostDetailsComponent,
    NewPostComponent
  ]
})
export class PostModule { }
