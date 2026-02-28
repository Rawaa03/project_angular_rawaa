import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css']
})
export class ProjectDetailComponent {
  @Input() project: any;
}