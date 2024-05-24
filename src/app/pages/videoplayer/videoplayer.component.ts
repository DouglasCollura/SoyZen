import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, signal, TemplateRef, ViewChild} from '@angular/core';
import {VgApiService, VgCoreModule, VgEvents} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { Post } from '@interfaces/post';
import { SectionService } from '@services/section.service';

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
    MatIconModule,
    MatBottomSheetModule
  ],
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss', './videoplayer-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VideoplayerComponent {

  private vgPlayer:VgApiService | undefined;

  @Input() urlPlayer:string = '';
  @Input() isLock:boolean = false;
  @ViewChild('modalFeel') modalFeel!: TemplateRef<any>;
  @ViewChild('modalInfo') modalInfo!: TemplateRef<any>;
  @Input() set pause(pause:boolean){
    if(pause && this.isPlaying()){
      this.vgPlayer?.pause();
      this.isPlaying.update(e=> !e);
    }
  };
  @Input() set setItem(item:Post){
    this.post.set(item);
  };
  @Output() nextMedia = new EventEmitter<boolean>();
  @Output() prevMedia = new EventEmitter<boolean>();

  public urlMedia = environment.urlMedia;
  private  _bottomSheet = inject(MatBottomSheet);
  private dialog = inject(MatDialog);
  public isPlaying = signal(false);
  public feelSelect = signal<number | null>(null);
  public post = signal<Post | null>(null);
  private sectionService = inject(SectionService);
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

    this.vgPlayer.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          this.vgPlayer!.getDefaultMedia().currentTime = 0;
          this.viewPost()
      }
  );

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
    this.prevMedia.emit(true);
  }

  ForwardMore(){
    this.nextMedia.emit(true);
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

  openBottomSheet(): void {
    this._bottomSheet.open(this.modalInfo);
  }


  viewPost(){
    this.sectionService.setViewPost(this.post()!.id)?.subscribe()
  }
}
