import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-retiro-panel',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './retiro-panel.html',
  styleUrl: './retiro-panel.css'
})
export class RetiroPanelComponent {

  @Input() loadingRetiro = false;
  @Input() cajeroActivo = false;
  @Input() totalDisponible = 0;

  @Output() retirarSubmit = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);

  retiroForm = this.fb.nonNullable.group({
    monto: [0, [Validators.required, Validators.min(1)]]
  });

  get monto() {
    return this.retiroForm.controls.monto;
  }

  retirar(): void {
    if (this.retiroForm.invalid) {
      this.retiroForm.markAllAsTouched();
      return;
    }

    const monto = this.retiroForm.getRawValue().monto;

    if (monto > this.totalDisponible) {
      this.monto.setErrors({ saldoInsuficiente: true });
      return;
    }

    this.retirarSubmit.emit(monto);
    this.retiroForm.reset({ monto: 0 });
  }
}