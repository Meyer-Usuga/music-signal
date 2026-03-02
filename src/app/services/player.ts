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
  private currentLoadedIndex = -1;

  readonly playlist = signal<Song[]>([]);
  readonly currentIndex = signal<number>(0);
  readonly isPlaying = signal<boolean>(false);
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(0);
  readonly volume = signal<number>(0.7);
  readonly progress = computed(() => {
    const d = this.duration() || 1;
    return (this.currentTime() / d) * 100;
  });

  readonly currentSong = computed(
    () => this.playlist()[this.currentIndex()] ?? null
  );

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.audio = new Audio();
      this.audio.volume = this.volume();
      this.audio.addEventListener('timeupdate', () => {
        if (!this.audio) return;
        this.currentTime.set(this.audio.currentTime || 0);
      });
      this.audio.addEventListener('loadedmetadata', () => {
        if (!this.audio) return;
        this.duration.set(this.audio.duration || 0);
      });
      this.audio.addEventListener('ended', () => this.next());
    }
  }

  loadPlaylist(list: Song[]): void {
    this.playlist.set(list);
    this.currentIndex.set(0);
    this.currentLoadedIndex = -1;
  }

  play(index?: number): void {
    if (!this.isBrowser || !this.audio) return;

    if (index !== undefined) this.currentIndex.set(index);
    const song = this.currentSong();
    if (!song) return;

    if (this.currentIndex() !== this.currentLoadedIndex) {
      this.audio.src = song.cover;
      this.audio.load();
      this.currentLoadedIndex = this.currentIndex();
    }

    this.audio.play();
    this.isPlaying.set(true);
  }

  pause(): void {
    if (!this.isBrowser || !this.audio) return;
    this.audio.pause();
    this.isPlaying.set(false);
  }

  seek(time: number): void {
    if (!this.isBrowser || !this.audio) return;
    this.audio.currentTime = Math.max(0, Math.min(time, this.duration() || 0));
    this.currentTime.set(this.audio.currentTime || 0);
  }

  setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(vol, 1));
    this.volume.set(clamped);
    if (this.isBrowser && this.audio) {
      this.audio.volume = clamped;
    }
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
