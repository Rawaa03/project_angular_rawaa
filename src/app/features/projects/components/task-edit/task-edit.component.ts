import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from '../../../../core/guards/pending-changes.guard';
import { ProjectService, ProjectTask } from '../../../../core/services/project.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit, CanComponentDeactivate {
  projectId = '';
  taskId = '';
  task?: ProjectTask;
  title = '';
  savedTitle = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId') ?? '';
      this.taskId = params.get('taskId') ?? '';
      this.task = this.projectService.getTaskById(this.projectId, this.taskId);
      this.title = this.task?.title ?? '';
      this.savedTitle = this.title;
    });
  }

  save(): void {
    this.savedTitle = this.title;
    this.router.navigate(['/projects', this.projectId, 'tasks', this.taskId]);
  }

  canDeactivate(): boolean {
    return this.title === this.savedTitle;
  }
}
