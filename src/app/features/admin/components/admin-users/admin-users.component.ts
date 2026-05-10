import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent {
  users = [
    { email: 'admin@test.com', role: 'admin' },
    { email: 'user@test.com', role: 'user' }
  ];
}
