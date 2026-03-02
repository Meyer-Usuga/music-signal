import { Component, inject, signal, linkedSignal } from '@angular/core';
import { Player } from '@services';

@Component({
  selector: 'app-controls',
  standalone: true,
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls {
  readonly player = inject(Player);
  seeking = false;
  seekValue = signal<number>(0);
  volume = linkedSignal(() => this.player.volume());

  onVolumeChange(value: number): void {
    this.player.setVolume(value);
  }

  onPlayPause(): void {
    this.player.isPlaying() ? this.player.pause() : this.player.play();
  }

  onNext(): void {
    this.player.next();
  }

  onPrev(): void {
    this.player.prev();
  }

  get currentTime(): number {
    return this.player.currentTime();
  }

  get duration(): number {
    return this.player.duration();
  }

  get progress(): number {
    return this.player.progress();
  }

  onSeekPreview(value: string | number): void {
    this.seekValue.set(Number(value));
  }

  onSeek(value: string | number): void {
    const t = Number(value);
    this.player.seek(t);
  }

  formatTime(sec = 0): string {
    const s = Math.floor(sec || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem.toString().padStart(2, '0')}`;
  }

  get Number() {
    return Number;
  }
}
