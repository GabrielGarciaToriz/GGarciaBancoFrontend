import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-message',
  standalone: true,
  imports: [],
  templateUrl: './loading-message.html',
  styleUrl: './loading-message.css'
})
export class LoadingMessageComponent {
  @Input() message = 'Cargando...';
}