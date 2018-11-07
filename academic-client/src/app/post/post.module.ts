import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PostDetailsComponent
  ],
  exports: [
    PostDetailsComponent
  ]
})
export class PostModule { }
