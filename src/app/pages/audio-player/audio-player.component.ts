import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { environment } from '../../../environments/environment';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
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
    MatBottomSheetModule,
    MatDialogModule,
  ],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss', './audio-player-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioPlayerComponent {

  @ViewChild('modalFeel') modalFeel!: TemplateRef<any>;
  @ViewChild('modalInfo') modalInfo!: TemplateRef<any>;
  private vgPlayer:VgApiService | undefined;
  public isPlaying = signal(false);
  private dialog = inject(MatDialog);
  @Input() urlPlayer:string = '';
  @Input() url_img:string = '';
  @Input({required: true}) title!:string;
  @Input() category!:string | null;
  @Input() isLock:boolean = false;
  @Input() set pause(pause:boolean){
    if(pause && this.isPlaying()){
      this.vgPlayer?.pause();
      this.isPlaying.update(e=> !e);
    }

  };
  private  _bottomSheet = inject(MatBottomSheet);

  public urlMedia = environment.urlMedia;
  public controlVideoPlayer = signal({
    isOver:false,
    hideTop:true,
  });


  private timeOut:any;
  public feelSelect = signal<number | null>(null);


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

  ReplayMore(){
    let time = this.vgPlayer?.currentTime;
    this.vgPlayer!.currentTime = (time - 15 < 0) ? 0 : (time - 15);
  }

  ForwardMore(){
    let time = this.vgPlayer?.currentTime;
    this.vgPlayer!.currentTime = (time + 15 > this.vgPlayer?.duration) ? (this.vgPlayer?.duration-1) : (time + 15);
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

  openBottomSheet(): void {
    this._bottomSheet.open(this.modalInfo);
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

  closeSheet(): void {
    this._bottomSheet.dismiss();
  }
 }
