import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overview.component.html'
})
export class ProjectOverviewComponent implements OnInit {
  project?: Project;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.project = data['project'];
    });
  }
}
