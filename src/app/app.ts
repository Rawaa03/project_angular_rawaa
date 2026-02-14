import { Component } from '@angular/core';
import { ProjectListComponent } from './features/projects/components/project-list/project-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
