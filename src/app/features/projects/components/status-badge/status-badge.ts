import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="px-3 py-1 rounded-full text-white text-sm"
      [ngClass]="getClass(status)">
      {{ status }}
    </span>
  `
})
export class StatusBadgeComponent {

  @Input() status!: string;

  getClass(status: string) {
    switch (status) {
      case 'Terminé': return 'bg-green-500';
      case 'En cours': return 'bg-yellow-500';
      case 'En attente': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  }
}