import { Component, inject, OnInit, signal } from '@angular/core';
import { Box, Preview, Controls } from '@components';
import { Song } from '@interfaces';
import { Player } from '@services';
@Component({
  selector: 'app-root',
  imports: [Box, Preview, Controls],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('music-signal');
  readonly #player = inject(Player);

  readonly playlist: Song[] = [
    {
      title: 'Self Esteem - The Offspring',
      author: { 
        name: 'The Offspring', 
        image: 'author1.webp' 
      },
      cover: 'song1.mp3',
    },
    {
      title: 'Bob Marley - Three Little Bird',
      author: { 
        name: 'Bob Marley', 
        image: 'author2.jpg' 
      },
      cover: 'song2.mp3',
    },
  ];

  ngOnInit() {
    this.#player.loadPlaylist(
      this.playlist
    );
  }
}
