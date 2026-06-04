import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputComponent {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
