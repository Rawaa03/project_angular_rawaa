import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl) => {

    const value = control.value;
    if (!value) return null;

    const errors: any = {};

    if (!/[A-Z]/.test(value)) errors.uppercase = true;
    if (!/[a-z]/.test(value)) errors.lowercase = true;
    if (!/[0-9]/.test(value)) errors.number = true;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors.special = true;
    if (value.length < 8) errors.length = true;

    return Object.keys(errors).length
      ? { passwordStrength: errors }
      : null;
  };
}

export function matchPasswordValidator(pass: string, confirm: string): ValidatorFn {
  return (form: AbstractControl) => {
    const password = form.get(pass)?.value;
    const confirmPassword = form.get(confirm)?.value;

    return password === confirmPassword ? null : { mustMatch: true };
  };
}