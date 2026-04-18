import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './features/projects/components/project-list/project-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProjectListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

  darkMode: boolean = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }
}