import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailExistsValidator } from '../../../../shared/email-exists.validator';
import { UserService } from '../../../../shared/user';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html'
})
export class CommentFormComponent {
  form: FormGroup;
  message = '';
  comments: Array<{ author: string; email: string; content: string }> = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      author: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [emailExistsValidator(this.userService)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  addComment(): void {
    if (this.form.pending) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const comment = this.form.getRawValue() as { author: string; email: string; content: string };
    this.comments.unshift(comment);
    this.form.reset();
    this.message = 'Commentaire ajoute';
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}
