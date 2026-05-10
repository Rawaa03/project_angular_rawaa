import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Project, ProjectService } from '../services/project.service';

export const projectResolver: ResolveFn<Project> = route => {
  const projectService = inject(ProjectService);
  const router = inject(Router);
  const project = projectService.getProjectById(route.paramMap.get('id'));

  if (!project) {
    router.navigate(['/projects'], {
      queryParams: { error: 'Projet introuvable' }
    });
    throw new Error('ID projet invalide');
  }

  return project;
};
