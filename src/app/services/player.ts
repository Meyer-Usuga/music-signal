import { 
  Injectable, 
  signal, 
  computed, 
  inject, 
  PLATFORM_ID 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { Song } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class Player {
  private audio?: HTMLAudioElement;
  private readonly isBrowser: boolean;

  readonly playlist = signal<Song[]>([]);
  readonly currentIndex = signal(0);
  readonly isPlaying = signal(false);

  readonly currentSong = computed(
    () => this.playlist()[this.currentIndex()] ?? null
  );

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.audio = new Audio();
      this.audio.addEventListener('ended', () => this.next());
    }
  }

  loadPlaylist(list: Song[]): void {
    this.playlist.set(list);
    this.currentIndex.set(0);
  }

  play(index?: number): void {
    if (!this.isBrowser || !this.audio) return;

    if (index !== undefined) this.currentIndex.set(index);
    const song = this.currentSong();
    if (!song) return;

    this.audio.src = song.cover;
    this.audio.play();
    this.isPlaying.set(true);
  }

  pause(): void {
    if (!this.isBrowser || !this.audio) return;
    this.audio.pause();
    this.isPlaying.set(false);
  }

  next(): void {
    const nextIndex = (this.currentIndex() + 1
  ) % this.playlist().length;
    this.play(nextIndex);
  }

  prev(): void {
    const prevIndex = (
      this.currentIndex() - 1 + this.playlist().length
    ) % this.playlist().length;
    this.play(prevIndex);
  }
}
