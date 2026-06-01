import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitar-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitar-reset.html',
  styleUrl: './solicitar-reset.css'
})
export class SolicitarResetComponent {

  @Input() loading      = false;
  @Input() mensajeExito = '';
  @Input() mensajeError = '';

  @Output() formSubmit = new EventEmitter<string>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  get correo() { return this.form.controls.correo; }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.form.getRawValue().correo);
  }
}