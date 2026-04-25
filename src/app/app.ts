import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './features/projects/components/project-list/project-list.component';
import { ContactFormComponent } from './features/forms/contact-form/contact-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProjectListComponent, ContactFormComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

  darkMode: boolean = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }
}