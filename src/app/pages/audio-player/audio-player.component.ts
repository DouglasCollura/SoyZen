import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { environment } from '../../../environments/environment';
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
  @Input() urlPlayer:string = '';
  @Input() url_img:string = '';
  @Input({required: true}) title!:string;
  @Input() category!:string | null;
  public urlMedia = environment.urlMedia;
  public controlVideoPlayer = signal({
    isOver:false,
    hideTop:true,
  });


  private timeOut:any;


  getMedia(){
    return `${this.urlMedia}${this.urlPlayer}`;
  }


  onPlayerReady(api: VgApiService) {
    this.vgPlayer = api;
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

  getImg(url:string){
    return `${this.urlMedia}${url}`;

  }
  titleBold(){
    // Expresión regular para buscar la etiqueta a reemplazar
  const regex = /<b class="text-\[14px\] leading-\[19\.07px\]">/;

  // Reemplazar la etiqueta con la nueva
  const nuevoTexto = this.title.replace(regex, '<b class="text-[20px] leading-[19.07px]">');

  return nuevoTexto;
}
 }
