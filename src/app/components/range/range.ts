import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-range',
  imports: [],
  templateUrl: './range.html',
  styleUrl: './range.scss',
})
export class Range {
  readonly max = input.required<number>(); 
  readonly value = input.required<number>(); 
  readonly onChange = output<string | number>();  
  readonly onInput = output<string | number>();

  onChangeValue(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange.emit(Number(value));
  }

  onInputValue(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onInput.emit(Number(value));
  }
}
