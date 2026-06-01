import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, Validators,
  AbstractControl, ValidationErrors
} from '@angular/forms';

function passwordsIguales(group: AbstractControl): ValidationErrors | null {
  const nueva     = group.get('nuevaPassword')?.value;
  const confirmar = group.get('confirmarPassword')?.value;
  return nueva && confirmar && nueva !== confirmar ? { noCoinciden: true } : null;
}

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cambiar-password.html',
  styleUrl: './cambiar-password.css'
})
export class CambiarPasswordComponent {

  @Input() loading      = false;
  @Input() mensajeExito = '';
  @Input() mensajeError = '';

  @Output() formSubmit = new EventEmitter<string>();

  private fb = inject(FormBuilder);

  mostrarPassword = false;

  form = this.fb.group(
    {
      nuevaPassword:    ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['', [Validators.required]]
    },
    { validators: passwordsIguales }
  );

  get nuevaPassword()    { return this.form.controls['nuevaPassword']; }
  get confirmarPassword(){ return this.form.controls['confirmarPassword']; }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.form.value.nuevaPassword!);
  }
}