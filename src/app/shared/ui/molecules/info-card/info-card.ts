import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css'
})
export class InfoCardComponent {
  @Input() title = '';
  @Input() value: string | null = '';
  @Input() description = '';
  @Input() tone: 'default' | 'success' | 'danger' = 'default';
}