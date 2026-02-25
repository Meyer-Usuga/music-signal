import { Component, inject, input } from '@angular/core';
import { Song } from '@interfaces';
import { Player } from '@services';

@Component({
  selector: 'app-preview',
  imports: [],
  templateUrl: './preview.html',
  styleUrl: './preview.scss',
})
export class Preview {
  readonly player = inject(Player);
}
