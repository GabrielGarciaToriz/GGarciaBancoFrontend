import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  @Input() loading: boolean = false;
  @Input() errorMessage: string | null = null;

  @Output() loginSubmit = new EventEmitter<LoginRequest>();
  @Output() goToRegister = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  loginForm = this.fb.nonNullable.group({
    numeroTarjeta: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{13,19}$/)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(4)
      ]
    ]
  });

  get numeroTarjeta() {
    return this.loginForm.controls.numeroTarjeta;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginSubmit.emit(this.loginForm.getRawValue());
  }
  irARegistro(): void {
    this.goToRegister.emit();
  }
}