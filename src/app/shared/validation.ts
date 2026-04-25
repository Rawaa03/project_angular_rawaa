import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {

  getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'Ce champ est obligatoire';
    if (control.errors['email']) return 'Email invalide';
    if (control.errors['minlength']) return 'Trop court';
    if (control.errors['maxlength']) return 'Trop long';
    if (control.errors['pattern']) return 'Format invalide';

    return 'Champ invalide';
  }

  hasError(control: AbstractControl | null, errorType: string): boolean {
    return !!control?.touched && !!control?.errors?.[errorType];
  }
}