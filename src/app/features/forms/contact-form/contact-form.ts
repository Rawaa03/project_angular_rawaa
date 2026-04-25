import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/validation';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html'
})
export class ContactFormComponent implements OnInit {

  form!: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    public validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.min(18), Validators.max(100)]],
      ville: [''],

      adresse: this.fb.group({
        rue: [''],
        codePostal: [''],
        ville: [''],
        pays: ['']
      }),

      adresses: this.fb.array([
        this.createAddressGroup()
      ])
    });
  }

  // =====================
  // PARTIE 5 FORMARRAY
  // =====================

  createAddressGroup(): FormGroup {
    return this.fb.group({
      type: ['domicile'],
      rue: [''],
      codePostal: [''],
      ville: ['']
    });
  }

  get adresses(): FormArray {
    return this.form.get('adresses') as FormArray;
  }

  addAdresse() {
    this.adresses.push(this.createAddressGroup());
  }

  removeAdresse(index: number) {
    if (this.adresses.length > 1) {
      this.adresses.removeAt(index);
    }
  }

  // =====================
  // SUBMIT
  // =====================

  onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      this.message = '';
      return;
    }

    console.log('FORM DATA:', this.form.value);
    this.message = '✅ Formulaire envoyé avec succès !';

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  // =====================
  // UTILS
  // =====================

  markFormGroupTouched() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  resetForm() {
    this.form.reset();
    this.message = '';
  }
}