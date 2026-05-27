import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginResponse } from '../../auth/models/login.model';
import { CajeroResponse, InventarioCajeroResponse } from '../models/cajero.model';

@Component({
    selector: 'app-home-dashboard',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
    templateUrl: './home-dashboard.html',
    styleUrl: './home-dashboard.css'
})
export class HomeDashboard {

    @Input() usuario: LoginResponse | null = null;
    @Input() cajero: CajeroResponse | null = null;
    @Input() inventario: InventarioCajeroResponse[] = [];

    @Input() loadingDashboard = false;
    @Input() loadingRetiro = false;

    @Input() errorMessage: string | null = null;
    @Input() successMessage: string | null = null;

    @Output() retirarSubmit = new EventEmitter<number>();
    @Output() logoutSubmit = new EventEmitter<void>();

    private fb = inject(FormBuilder);
    retiroForm = this.fb.nonNullable.group({
        monto: [0, [Validators.required, Validators.min(1)]]
    });

    get monto() {
        return this.retiroForm.controls.monto;
    }

    get totalDisponible(): number {
        return this.inventario.reduce((total, item) => {
            return total + (item.total ?? 0);
        }, 0);
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

    cerrarSesion(): void {
        this.logoutSubmit.emit();
    }
}