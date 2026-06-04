import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MovimientoResponse } from '../../../../features/home/models/movimiento.model';

@Component({
  selector: 'app-movimientos-history',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './movimientos-history.html',
  styleUrl: './movimientos-history.css'
})
export class MovimientosHistoryComponent {
  @Input() movimientos: MovimientoResponse[] = [];
  @Input() cargandoMovimientos = false;
  @Input() mensajeErrorMovimientos = '';
}