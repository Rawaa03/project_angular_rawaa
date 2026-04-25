import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private existingEmails = ['test@test.com', 'admin@gmail.com'];

  checkEmailExists(email: string): Observable<boolean> {
    const exists = this.existingEmails.includes(email);
    return of(exists).pipe(delay(1500));
  }
}