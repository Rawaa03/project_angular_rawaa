import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';
import { StatusBadgeComponent } from '../status-badge/status-badge';
import { FriendlyDatePipe } from '../../../../shared/friendly-date-pipe';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TaskListComponent, StatusBadgeComponent, FriendlyDatePipe],
  templateUrl: './project-detail.html'
})
export class ProjectDetailComponent implements OnInit {

  @Input() project: any;
  @Output() notify = new EventEmitter<string>();

  progress: number = 0;

  ngOnInit() {
    this.updateProgress();
  }

  onStatusChanged() {
    this.updateProgress();
    this.notify.emit('Statut modifié avec succès');
  }

  updateProgress() {
    const total = this.project.tasks.length;

    const done = this.project.tasks.filter(
      (t: any) => t.status === 'Terminé'
    ).length;

    this.progress = total === 0 ? 0 : Math.round((done / total) * 100);
  }
}