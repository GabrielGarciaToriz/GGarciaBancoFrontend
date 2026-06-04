import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoginResponse } from '../../../../features/auth/models/login.model';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css'
})
export class DashboardHeaderComponent {
  @Input() usuario: LoginResponse | null = null;
  @Output() logoutSubmit = new EventEmitter<void>();
}