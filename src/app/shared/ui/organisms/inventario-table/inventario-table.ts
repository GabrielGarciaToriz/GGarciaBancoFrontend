import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { InventarioCajeroResponse } from '../../../../features/home/models/cajero.model';

@Component({
  selector: 'app-inventario-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './inventario-table.html',
  styleUrl: './inventario-table.css'
})
export class InventarioTableComponent {
  @Input() inventario: InventarioCajeroResponse[] = [];
}