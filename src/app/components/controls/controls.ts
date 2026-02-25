import { Component, inject } from '@angular/core';
import { Player } from '@services';

@Component({
  selector: 'app-controls',
  standalone: true,
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls {
  readonly player = inject(Player);

  onPlayPause(): void {
    this.player.isPlaying() ? this.player.pause() : this.player.play();
  }

  onNext(): void {
    this.player.next();
  }

  onPrev(): void {
    this.player.prev();
  }

  onChanveVolume(){
    //TODO: Falta implementar
    //this.player.changeVolume();
  }

  onLoop(){
    //TODO: Falta implementar
    //this.player.loop();
  }

  onFavorite(){ 
    //TODO: Falta implementar
    //this.player.saveFavorite();
  }
}
