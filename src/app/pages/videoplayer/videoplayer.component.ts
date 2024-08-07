import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, signal, TemplateRef, ViewChild} from '@angular/core';
import {VgApiService, VgCoreModule, VgEvents} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { Post } from '@interfaces/post';
import { SectionService } from '@services/section.service';
import { RouterModule } from '@angular/router';

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
    MatBottomSheetModule,
    RouterModule
  ],
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss', './videoplayer-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VideoplayerComponent {

  constructor(){
  }

  private vgPlayer:VgApiService | undefined;

  @Input() urlPlayer:string = '';
  @Input() isLock:boolean = false;
  @ViewChild('modalFeel') modalFeel!: TemplateRef<any>;
  @ViewChild('modalFeelMeditation') modalFeelMeditation!: TemplateRef<any>;

  @ViewChild('modalInfo') modalInfo!: TemplateRef<any>;
  @Input() set pause(pause:boolean){
    this.feelSelect.set(null)
    if(pause && this.isPlaying()){
      this.vgPlayer?.pause();
      this.isPlaying.update(e=> !e);
    }
  };
  @Input() set setItem(item:Post){
    this.post.set(item);
    this.getFeedBack();
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

  private ctrlModals:MatDialogRef<any> | null = null;

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

  stop(){
    this.vgPlayer?.pause();
    this.vgPlayer!.currentTime = 0;
    this.isPlaying() && this.isPlaying.update(e=> !e);

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

  ForwardMore(isModal: boolean = false){
    this.nextMedia.emit(!isModal);
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
    this.ctrlModals = this.dialog.open(this.modalFeel, {
      width: '100%',
      height: '100%',
      maxHeight:'320px',
      maxWidth:'505px',
      panelClass: 'panel-feel'
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(this.modalInfo);
  }

  setFeedback(id:any,name:any){
    this.feelSelect.set(id)
    if(name == 'Sin ánimo'){
      this.ctrlModals?.close();
      this.dialog.open(this.modalFeelMeditation, {
        width: '100%',
        height: '100%',
        maxHeight:'320px',
        maxWidth:'505px',
        panelClass: 'panel-feel'
      });
    }
    this.sectionService.setFeelPost({idPost:this.post()?.id, feedback: id})
  }


  viewPost(){
    this.sectionService.setViewPost(this.post()!.id)?.subscribe()
  }

  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }

  getFeedBack(){
    this.sectionService.getFeedback(this.post()!.id)?.subscribe(
      (data)=>{
        this.feelSelect.set(data.id);
      }
    )
  }
}
