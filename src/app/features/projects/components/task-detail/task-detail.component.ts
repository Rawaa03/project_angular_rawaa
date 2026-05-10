import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { ProjectService, ProjectTask } from '../../../../core/services/project.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CommentFormComponent],
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit {
  projectId = '';
  taskId = '';
  task?: ProjectTask;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id') ?? '';
      this.taskId = params.get('taskId') ?? '';
      this.task = this.projectService.getTaskById(this.projectId, this.taskId);
    });

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => this.viewportScroller.scrollToAnchor(fragment), 0);
      }
    });
  }

  goBackToBoard(): void {
    this.router.navigate(['/projects', this.projectId, 'board']);
  }

  goToComments(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      fragment: 'comments'
    });
  }
}
