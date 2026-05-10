import { Routes } from '@angular/router';
import { PROJECTS_ROUTES } from './projects.routes';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { pendingChangesGuard } from './core/guards/pending-changes.guard';
import { TaskEditComponent } from './features/projects/components/task-edit/task-edit.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'projects/:projectId/tasks/:taskId/edit',
    component: TaskEditComponent,
    canDeactivate: [pendingChangesGuard]
  },
  ...PROJECTS_ROUTES,
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { path: '**', redirectTo: 'projects' }
];
