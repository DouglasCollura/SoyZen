import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef, ViewChild, booleanAttribute, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import VideoplayerComponent from '../../../pages/videoplayer/videoplayer.component';
import { PostMediaType } from '@interfaces/section_post';
import AudioPlayerComponent from '../../../pages/audio-player/audio-player.component';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    VideoplayerComponent,
    AudioPlayerComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  private dialog = inject(MatDialog);
  private router = inject(Router);

  @ViewChild('modalVideo') modalVideo!: TemplateRef<any>;
  @ViewChild('modalAudio') modalAudio!: TemplateRef<any>;
  @Input({transform: booleanAttribute}) isNew:boolean = false;
  @Input({transform: booleanAttribute}) isLock:boolean = false;
  @Input({required: true}) title!:string;
  @Input() time!:string | null;
  @Input() titleSection!:any;
  @Input() category!:string | null;
  @Input({required: true}) url_img!:string;
  @Input() user:any = null;
  @Input() type:string = 'blog';
  @Input() urlPlayer:string = '';



  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  public urlMedia = environment.urlMedia;


  openDialog(): void {
    console.log('lock',this.type)
    if(!this.isLock){

      if(this.type == PostMediaType.audio){
        this.dialog.open(this.modalAudio, {
          width: '100%',
          height: '100%',
          // data:
          panelClass: 'full-screen-modal-player'
        });
      }

      else if(this.type == PostMediaType.video){

        this.dialog.open(this.modalVideo, {
          width: '100%',
          height: '100%',
          maxWidth:'100%',
          panelClass: 'full-screen-modal-player'
        });
      } else{
        this.router.navigateByUrl('home/post');
      }
    }else{
      this.dialog.open(this.modalEvent, {
        width: '400px',
        panelClass: 'full-screen-modal'
      });
    }

  }

  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }

 }
