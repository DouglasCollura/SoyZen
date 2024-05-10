import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef, ViewChild, booleanAttribute, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import VideoplayerComponent from '../../../pages/videoplayer/videoplayer.component';
import AudioPlayerComponent from '../../../pages/audio-player/audio-player.component';
import { PostMediaType, Post } from '@interfaces/post';
import { AuthService } from '@services/auth.service';
import { SectionService } from '@services/section.service';

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
  styleUrls: ['./card.component.scss','./card-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  private dialog = inject(MatDialog);
  private router = inject(Router);
  private authService = inject(AuthService);
  private sectionService = inject(SectionService);

  @ViewChild('modalVideo') modalVideo!: TemplateRef<any>;
  @ViewChild('modalAudio') modalAudio!: TemplateRef<any>;
  @Input({transform: booleanAttribute}) isNew:boolean = false;
  @Input({transform: booleanAttribute}) isList:boolean = false;
  @Input() titleSection!:any;
  @Input() urlPlayer:string = '';
  @Input() textColor:any = '';
  @Input() post!:Post;


  public postTypes = PostMediaType;
  public screenWidth: any;

  constructor(){
    this.screenWidth = window.innerWidth;
  }


  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  public urlMedia = environment.urlMedia;


  openDialog(): void {
    console.log('post ', this.post);

    if(this.isUnLock()){
      if(this.screenWidth > 500 || this.titleSection != 'Mood Zen del día'){
        if(this.post.postType.name == PostMediaType.audio){
          this.dialog.open(this.modalAudio, {
            width: '100%',
            height: '100%',
            maxWidth:'100%',
            // data:
            panelClass: 'full-screen-modal-player'
          });
        }

        else if(this.post.postType.name == PostMediaType.video){

          this.dialog.open(this.modalVideo, {
            width: '100%',
            height: '100%',
            maxWidth:'100%',
            panelClass: 'full-screen-modal-player'
          });
        } else{
          this.router.navigateByUrl('home/post');
        }
      }
    }else{
      this.dialog.open(this.modalEvent, {
        width: '400px',
        panelClass: 'full-screen-modal'
      });
    }

  }

  likePost(){
    this.sectionService.setLikePost(this.post.id)?.subscribe((data:any)=> this.post = data.post)
  }

  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }

  isUnLock(){
    return this.authService.isUnLock(this.post);
  }


  close(){
    this.dialog.closeAll()
  }

 }
