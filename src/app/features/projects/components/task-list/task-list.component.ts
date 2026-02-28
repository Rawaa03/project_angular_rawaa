import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityColorPipe } from '../../../../shared/priority-color-pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    PriorityColorPipe
  ],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {

  @Input() tasks: any[] = [];

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
}