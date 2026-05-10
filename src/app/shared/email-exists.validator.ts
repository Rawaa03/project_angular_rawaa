import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user';

export function emailExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }

    return userService.checkEmailExists(control.value).pipe(
      map(exists => (exists ? { emailExists: true } : null))
    );
  };
}
