import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html' // ✅ FIX HERE
})
export class DashboardComponent implements OnChanges {

  @Input() projects: any[] = [];

  totalProjects = 0;
  totalTasks = 0;
  progress = 0;

  ngOnChanges() {
    this.calculate();
  }

  calculate() {
    this.totalProjects = this.projects.length;

    this.totalTasks = this.projects.reduce(
      (sum, p) => sum + p.tasks.length, 0
    );

    const done = this.projects.reduce(
      (sum, p) => sum + p.tasks.filter((t: any) => t.status === 'Terminé').length, 0
    );

    this.progress = this.totalTasks === 0
      ? 0
      : Math.round((done / this.totalTasks) * 100);
  }
}