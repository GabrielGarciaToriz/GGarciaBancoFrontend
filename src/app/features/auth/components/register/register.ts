import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { RegisterRequest } from '../../models/register.model';
import { BancoResponse } from '../../models/banco.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  @Input() loading: boolean = false;
  @Input() loadingBancos: boolean = false;
  @Input() errorMessage: string | null = null;
  @Input() bancos: BancoResponse[] = [];

  @Output() registerSubmit = new EventEmitter<RegisterRequest>();
  @Output() goToLogin = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellidoPaterno: ['', [Validators.required, Validators.minLength(2)]],
    apellidoMaterno: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    idBanco: [0, [Validators.required, Validators.min(1)]]
  });


  get nombre() {
    return this.registerForm.controls.nombre;
  }

  get apellidoPaterno() {
    return this.registerForm.controls.apellidoPaterno;
  }

  get apellidoMaterno() {
    return this.registerForm.controls.apellidoMaterno;
  }

  get correo() {
    return this.registerForm.controls.correo;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get idBanco() {
    return this.registerForm.controls.idBanco;
  }

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registerSubmit.emit(this.registerForm.getRawValue());
  }
  irALogin(): void {
    this.goToLogin.emit();
  }

}