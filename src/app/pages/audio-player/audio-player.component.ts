import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioPlayerComponent {


  private vgPlayer:VgApiService | undefined;
  public isPlaying = signal(false);

  public controlVideoPlayer = signal({
    isOver:false,
    hideTop:true,
  });


  private timeOut:any;

  onPlayerReady(api: VgApiService) {
    this.vgPlayer = api;
    console.log(api)
  }

  playPause(){
    this.isPlaying() ?
      this.vgPlayer?.pause() :
      this.vgPlayer?.play();
    this.isPlaying.update(e=> !e);
  }

  Replay(){
    let time = this.vgPlayer?.currentTime;
    this.vgPlayer!.currentTime = (time - 10 < 0) ? 0 : (time - 10);
  }

  Forward(){
    let time = this.vgPlayer?.currentTime;
    this.vgPlayer!.currentTime = (time + 10 > this.vgPlayer?.duration) ? (this.vgPlayer?.duration-1) : (time + 10);
  }

  showTopControl(){
    if(!this.controlVideoPlayer().isOver){
      this.controlVideoPlayer.update(value=>({...value, isOver:true,hideTop:false}));
    }
    clearTimeout(this.timeOut);

    this.timeOut = setTimeout(()=>{
      this.controlVideoPlayer.update(value=>({...value, hideTop:true}));
      setTimeout(()=>{
        this.controlVideoPlayer.update(value=>({...value, isOver:false}));
      },500)
    },1000);
  }
 }