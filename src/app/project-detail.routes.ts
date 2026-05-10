import { Routes } from '@angular/router';
import { ProjectOverviewComponent } from './features/projects/components/project-overview/project-overview.component';
import { ProjectBoardComponent } from './features/projects/components/project-board/project-board.component';
import { TaskListComponent } from './features/projects/components/task-list/task-list.component';
import { ActivityComponent } from './features/projects/components/activity/activity.component';

export const PROJECT_DETAIL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: ProjectOverviewComponent
  },
  {
    path: 'board',
    component: ProjectBoardComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    data: { reuse: true }
  },
  {
    path: 'activity',
    component: ActivityComponent
  }
];
