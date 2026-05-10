import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PriorityColorPipe } from '../../../../shared/priority-color-pipe';
import { ProjectService, ProjectTask } from '../../../../core/services/project.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PriorityColorPipe],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  projectId = '';
  tasks: ProjectTask[] = [];
  sort: string = '';
  status: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = params.get('id') ?? '';
      this.loadTasks();
    });

    this.route.queryParamMap.subscribe(params => {
      this.sort = params.get('sort') ?? '';
      this.status = params.get('status') ?? '';
    });
  }

  getFilteredTasks() {
    let result = [...this.tasks];

    if (this.status) {
      result = result.filter(task => task.status === this.status);
    }

    if (this.sort === 'priority') {
      const order = { Haute: 1, Moyenne: 2, Basse: 3 };
      result.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return result;
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: this.sort || null,
        status: this.status || null
      },
      queryParamsHandling: 'merge'
    });
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'En attente':
        return 'border-rose-300 bg-rose-50';
      case 'En cours':
        return 'border-pink-300 bg-pink-50';
      case 'Termine':
        return 'border-fuchsia-300 bg-fuchsia-50';
      default:
        return 'border-rose-200 bg-rose-50';
    }
  }

  changeStatus(task: ProjectTask) {
    this.projectService.cycleTaskStatus(this.projectId, task.id);
    this.loadTasks();
  }

  private loadTasks(): void {
    this.tasks = this.projectService.getProjectById(this.projectId)?.tasks ?? [];
  }
}
