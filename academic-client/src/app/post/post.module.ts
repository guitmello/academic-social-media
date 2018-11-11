import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details/post-details.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostService } from './post.service';
import { SharedModule } from '../shared/shared.module';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    PostDetailsComponent,
    NewPostComponent,
    CommentsComponent
  ],
  exports: [
    PostDetailsComponent,
    NewPostComponent,
    CommentsComponent
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
