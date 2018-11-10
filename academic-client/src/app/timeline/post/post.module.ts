import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostDetailsComponent } from './post-details/post-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    PostDetailsComponent
  ],
  exports: [
    PostDetailsComponent
  ]
})
export class PostModule { }
