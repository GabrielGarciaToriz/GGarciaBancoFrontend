import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.css'
})
export class ErrorMessage {
  @Input() message = '';
}