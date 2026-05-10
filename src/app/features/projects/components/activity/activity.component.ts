import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html'
})
export class ActivityComponent {
  activities = [
    'Projet cree',
    'Taches initialisees',
    'Routes enfants configurees'
  ];
}
