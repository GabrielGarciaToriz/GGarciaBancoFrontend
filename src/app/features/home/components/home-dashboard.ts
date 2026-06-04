import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoginResponse } from '../../auth/models/login.model';
import { CajeroResponse, InventarioCajeroResponse } from '../models/cajero.model';
import { MovimientoResponse } from '../models/movimiento.model';

import { DashboardLayoutComponent } from '../../../shared/ui/templates/dashboard-layout/dashboard-layout';
import { DashboardHeaderComponent } from '../../../shared/ui/organisms/dashboard-header/dashboard-header';
import { CajeroSummaryComponent } from '../../../shared/ui/organisms/cajero-summary/cajero-summary';
import { InventarioTableComponent } from '../../../shared/ui/organisms/inventario-table/inventario-table';
import { RetiroPanelComponent } from '../../../shared/ui/organisms/retiro-panel/retiro-panel';
import { MovimientosHistoryComponent } from '../../../shared/ui/organisms/movimientos-history/movimientos-history';
import { AlertComponent } from '../../../shared/ui/atoms/alert/alert';
import { LoadingMessageComponent } from '../../../shared/ui/atoms/loading-message/loading-message';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    DashboardHeaderComponent,
    CajeroSummaryComponent,
    InventarioTableComponent,
    RetiroPanelComponent,
    MovimientosHistoryComponent,
    AlertComponent,
    LoadingMessageComponent
  ],
  templateUrl: './home-dashboard.html',
  styleUrl: './home-dashboard.css'
})
export class HomeDashboard {

  @Input() usuario: LoginResponse | null = null;
  @Input() cajero: CajeroResponse | null = null;
  @Input() inventario: InventarioCajeroResponse[] = [];

  @Input() movimientos: MovimientoResponse[] = [];
  @Input() cargandoMovimientos = false;
  @Input() mensajeErrorMovimientos = '';

  @Input() loadingDashboard = false;
  @Input() loadingRetiro = false;

  @Input() errorMessage: string | null = null;
  @Input() successMessage: string | null = null;

  @Output() retirarSubmit = new EventEmitter<number>();
  @Output() logoutSubmit = new EventEmitter<void>();

  get totalDisponible(): number {
    return this.inventario.reduce((total, item) => {
      return total + (item.total ?? 0);
    }, 0);
  }
}