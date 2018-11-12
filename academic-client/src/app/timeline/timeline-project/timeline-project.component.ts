import { Component, OnInit, Output } from '@angular/core';
import { PostService } from '../../post/post.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-timeline-project',
  templateUrl: './timeline-project.component.html',
  styleUrls: ['./timeline-project.component.css']
})
export class TimelineProjectComponent implements OnInit {

  @Output() projectId: string;
  project: Project;
  public posts: Post[] = [];
  @Output() post: Post;

  constructor(
    private postService: PostService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getProject(params.id);
      }
    });
  }

  getProject(projectId) {
    this.projectService.getProject(projectId).subscribe(response => {
      this.project = response;
      this.getProjectPosts(this.project._id);
    });
  }

  getProjectPosts(projectId) {
    this.postService.getProjectPosts(projectId).subscribe(response => {
      this.posts = response;
      this.posts.forEach(post => {
        post.user.photo = `http://localhost:8081${post.user.photo}`;
      });
      this.getNewPost(this.posts);
    });
  }

  getNewPost(posts) {
    return this.postService.newPost.subscribe(post => {
      posts.unshift(post);
    });
  }

}
