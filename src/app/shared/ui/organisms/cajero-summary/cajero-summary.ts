import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CajeroResponse } from '../../../../features/home/models/cajero.model';
import { InfoCardComponent } from '../../molecules/info-card/info-card';

@Component({
  selector: 'app-cajero-summary',
  standalone: true,
  imports: [CurrencyPipe, InfoCardComponent],
  templateUrl: './cajero-summary.html',
  styleUrl: './cajero-summary.css'
})
export class CajeroSummaryComponent {
  @Input() cajero: CajeroResponse | null = null;
  @Input() totalDisponible = 0;
}