import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserService } from './user';

export function emailExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return userService.checkEmailExists(control.value).pipe(
      map(exists => (exists ? { emailExists: true } : null))
    );
  };
}