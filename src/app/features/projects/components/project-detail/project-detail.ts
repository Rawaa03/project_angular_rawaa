import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StatusBadgeComponent } from '../status-badge/status-badge';
import { FriendlyDatePipe } from '../../../../shared/friendly-date-pipe';
import { Project } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, StatusBadgeComponent, FriendlyDatePipe],
  templateUrl: './project-detail.html'
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;
  progress: number = 0;
  resolving = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data['project'];
      this.updateProgress();
      this.resolving = false;
    });
  }

  updateProgress() {
    if (!this.project) {
      this.progress = 0;
      return;
    }

    const total = this.project.tasks.length;
    const done = this.project.tasks.filter(task => task.status === 'Termine').length;

    this.progress = total === 0 ? 0 : Math.round((done / total) * 100);
  }
}
