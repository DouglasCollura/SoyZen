import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, TemplateRef, ViewChild} from '@angular/core';
import {VgApiService, VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VideoplayerComponent {

  private vgPlayer:VgApiService | undefined;
  @Input() urlPlayer:string = '';
  @ViewChild('modalFeel') modalFeel!: TemplateRef<any>;

  public urlMedia = environment.urlMedia;
  private dialog = inject(MatDialog);
  public isPlaying = signal(false);
  public feelSelect = signal<number | null>(null);

  public controlVideoPlayer = signal({
    isOver:false,
    hideTop:true,
  });
constructor(){
  console.log('repro')
}
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

  openFeelModal(){
    this.dialog.open(this.modalFeel, {
      width: '100%',
      height: 'auto',
      maxHeight:'300px',
      maxWidth:'400px',
      panelClass: 'panel-feel'
    });
  }
}
