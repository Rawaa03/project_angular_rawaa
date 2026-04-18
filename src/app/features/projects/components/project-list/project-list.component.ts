import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from '../project-detail/project-detail';
import { DashboardComponent } from '../dashboard/dashboard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectDetailComponent, DashboardComponent],
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent {

  message: string = '';
  selectedProject: any = null;

  // 🔥 champs formulaire
  newProjectName: string = '';
  newProjectDesc: string = '';

  projects = [
    {
      name: 'Projet 1',
      description: 'Application Angular',
      status: 'En cours',
      createdAt: new Date(),
      tasks: [
        { title: 'Design UI', priority: 'Haute', status: 'En attente' },
        { title: 'Backend API', priority: 'Moyenne', status: 'En cours' }
      ]
    }
  ];

  selectProject(p: any) {
    this.selectedProject = p;
  }

  showMessage(msg: string) {
    this.message = msg;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  // 🔥 AJOUT PROJET
  addProject() {
    if (!this.newProjectName) return;

    const newProject = {
      name: this.newProjectName,
      description: this.newProjectDesc,
      status: 'En attente',
      createdAt: new Date(), // ✅ DATE AUTO
      tasks: []
    };

    this.projects.push(newProject);

    this.showMessage('Projet ajouté avec succès');

    this.newProjectName = '';
    this.newProjectDesc = '';
  }

  // 🔥 SUPPRESSION PROJET
  deleteProject(project: any) {
    this.projects = this.projects.filter(p => p !== project);

    if (this.selectedProject === project) {
      this.selectedProject = null;
    }

    this.showMessage('Projet supprimé');
  }
}