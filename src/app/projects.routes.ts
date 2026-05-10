import { Routes } from '@angular/router';
import { ProjectListComponent } from './features/projects/components/project-list/project-list.component';
import { ProjectDetailComponent } from './features/projects/components/project-detail/project-detail';
import { SettingsComponent } from './features/projects/components/settings/settings.component';
import { TaskDetailComponent } from './features/projects/components/task-detail/task-detail.component';
import { projectResolver } from './core/resolvers/project.resolver';
import { PROJECT_DETAIL_ROUTES } from './project-detail.routes';

export const PROJECTS_ROUTES: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projects/:id/tasks/:taskId',
    component: TaskDetailComponent
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    resolve: { project: projectResolver },
    children: PROJECT_DETAIL_ROUTES
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];
