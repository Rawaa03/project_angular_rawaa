import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-projects.component.html'
})
export class AdminProjectsComponent {
  constructor(public projectService: ProjectService) {}
}
