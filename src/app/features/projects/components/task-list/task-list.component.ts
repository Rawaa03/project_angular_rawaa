import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriorityColorPipe } from '../../../../shared/priority-color-pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PriorityColorPipe],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {

  @Input() tasks: any[] = [];
  @Output() statusChanged = new EventEmitter<void>();

  filterPriority: string = '';

  getFilteredTasks() {
    if (!this.filterPriority) return this.tasks;
    return this.tasks.filter(t => t.priority === this.filterPriority);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'En attente':
        return 'border-rose-300 bg-rose-50';
      case 'En cours':
        return 'border-pink-300 bg-pink-50';
      case 'Terminé':
        return 'border-fuchsia-300 bg-fuchsia-50';
      default:
        return 'border-rose-200 bg-rose-50';
    }
  }

  changeStatus(task: any) {
    if (task.status === 'En attente') {
      task.status = 'En cours';
    } else if (task.status === 'En cours') {
      task.status = 'Terminé';
    } else {
      task.status = 'En attente';
    }

    this.statusChanged.emit();
  }
}