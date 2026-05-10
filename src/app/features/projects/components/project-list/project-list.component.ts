import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard';
import { Project, ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DashboardComponent],
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent {
  message: string = '';
  newProjectName: string = '';
  newProjectDesc: string = '';

  constructor(private projectService: ProjectService) {}

  get projects(): Project[] {
    return this.projectService.getProjects();
  }

  showMessage(msg: string) {
    this.message = msg;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  addProject() {
    if (!this.newProjectName) return;

    this.projectService.addProject(this.newProjectName, this.newProjectDesc);
    this.showMessage('Projet ajoute avec succes');

    this.newProjectName = '';
    this.newProjectDesc = '';
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id);
    this.showMessage('Projet supprime');
  }
}
