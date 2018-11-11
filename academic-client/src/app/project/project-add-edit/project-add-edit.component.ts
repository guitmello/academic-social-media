import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/post/post.service';
import { Post } from '../../shared/post/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css']
})
export class ProjectAddEditComponent implements OnInit {

  isCreating = true;

  post: Post;

  projectForm: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRouted: ActivatedRoute
  ) { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      description: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      projectProgress: new FormControl('', {
        validators: [Validators.required]
      }),
    });
  }
}
