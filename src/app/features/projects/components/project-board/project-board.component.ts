import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project, ProjectTask } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-board',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-board.component.html'
})
export class ProjectBoardComponent implements OnInit {
  project?: Project;
  columns = ['En attente', 'En cours', 'Termine'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.project = data['project'];
    });
  }

  getTasks(status: string): ProjectTask[] {
    return this.project?.tasks.filter(task => task.status === status) ?? [];
  }
}
