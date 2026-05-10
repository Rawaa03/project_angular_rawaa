import { Injectable, signal } from '@angular/core';

export type UserRole = 'user' | 'admin' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = signal(false);
  userRole = signal<UserRole>(null);

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  isAdmin(): boolean {
    return this.userRole() === 'admin';
  }

  login(email: string, password: string): boolean {
    if (!email || !password) {
      return false;
    }

    this.loggedIn.set(true);
    this.userRole.set(email === 'admin@test.com' ? 'admin' : 'user');
    return true;
  }

  logout(): void {
    this.loggedIn.set(false);
    this.userRole.set(null);
  }
}
