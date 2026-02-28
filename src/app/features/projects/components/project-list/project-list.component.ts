import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectDetailComponent } from '../project-detail/project-detail';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectDetailComponent],
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent {

  searchTerm: string = '';
  selectedProject: any = null;

  projects = [
    {
      name: 'Projet 1',
      description: 'Description 1',
      status: 'En cours',
      createdAt: new Date(),
      tasks: [
      ]
    },
    {
      name: 'Projet 2',
      description: 'Description 2',
      status: 'Terminé',
      createdAt: new Date(),
      tasks: [
        { title: 'Tâche 1', priority: 'Basse', status: 'Terminé' }
      ]
    }
  ];

  selectProject(project: any) {
    this.selectedProject = project;
  }

  get filteredProjects() {
    return this.projects.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}