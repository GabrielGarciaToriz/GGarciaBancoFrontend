import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css'
})
export class AlertComponent {
  @Input() type: 'error' | 'success' | 'info' = 'info';
  @Input() message = '';
}