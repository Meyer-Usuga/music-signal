import { Component, signal } from '@angular/core';
import { Box, Preview, Controls } from '@components';

@Component({
  selector: 'app-root',
  imports: [Box, Preview, Controls],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('music-signal');
}
