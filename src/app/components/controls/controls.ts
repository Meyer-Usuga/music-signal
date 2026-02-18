import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-controls',
  imports: [],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls {
  readonly isPaused = signal(true);

  onPause(): void {
    this.isPaused.set(true);
  }

  onPlay(): void {
    this.isPaused.set(false);
  }
}
