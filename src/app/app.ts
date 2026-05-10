import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  darkMode: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false;
      }
    });
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  loginAsAdmin() {
    this.authService.login('admin@test.com', 'admin');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/projects']);
  }
}
