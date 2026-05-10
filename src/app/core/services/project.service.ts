import { Injectable, signal } from '@angular/core';

export type TaskStatus = 'En attente' | 'En cours' | 'Termine';
export type TaskPriority = 'Haute' | 'Moyenne' | 'Basse';

export interface ProjectTask {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  tasks: ProjectTask[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly projectsSignal = signal<Project[]>([
    {
      id: '1',
      name: 'Projet 1',
      description: 'Application Angular',
      status: 'En cours',
      createdAt: new Date(2026, 1, 14),
      tasks: [
        {
          id: '1',
          title: 'Design UI',
          priority: 'Haute',
          status: 'En attente',
          description: 'Preparer les ecrans principaux et harmoniser les composants.'
        },
        {
          id: '2',
          title: 'Backend API',
          priority: 'Moyenne',
          status: 'En cours',
          description: 'Connecter les donnees projets et taches a une API.'
        },
        {
          id: '3',
          title: 'Tests routing',
          priority: 'Basse',
          status: 'Termine',
          description: 'Verifier les routes dynamiques, enfants et guards.'
        }
      ]
    }
  ]);

  getProjects(): Project[] {
    return this.projectsSignal();
  }

  getProjectById(id: string | null): Project | undefined {
    return this.projectsSignal().find(project => project.id === id);
  }

  getTaskById(projectId: string | null, taskId: string | null): ProjectTask | undefined {
    return this.getProjectById(projectId)?.tasks.find(task => task.id === taskId);
  }

  addProject(name: string, description: string): void {
    const nextId = String(this.projectsSignal().length + 1);

    this.projectsSignal.update(projects => [
      ...projects,
      {
        id: nextId,
        name,
        description,
        status: 'En attente',
        createdAt: new Date(),
        tasks: []
      }
    ]);
  }

  deleteProject(projectId: string): void {
    this.projectsSignal.update(projects => projects.filter(project => project.id !== projectId));
  }

  cycleTaskStatus(projectId: string, taskId: string): void {
    this.projectsSignal.update(projects => projects.map(project => {
      if (project.id !== projectId) {
        return project;
      }

      return {
        ...project,
        tasks: project.tasks.map(task => {
          if (task.id !== taskId) {
            return task;
          }

          return {
            ...task,
            status: this.nextStatus(task.status)
          };
        })
      };
    }));
  }

  private nextStatus(status: TaskStatus): TaskStatus {
    if (status === 'En attente') {
      return 'En cours';
    }

    if (status === 'En cours') {
      return 'Termine';
    }

    return 'En attente';
  }
}
