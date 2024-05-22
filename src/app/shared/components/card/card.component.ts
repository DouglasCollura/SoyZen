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
import { ReelService } from '@services/reel.service';
import { ReelComponent } from '../reel/reel.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    VideoplayerComponent,
    AudioPlayerComponent,
    ReelComponent
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
  private reelService = inject(ReelService);

  @ViewChild('modalVideo') modalVideo!: TemplateRef<any>;
  @ViewChild('modalAudio') modalAudio!: TemplateRef<any>;
  @Input({transform: booleanAttribute}) isNew:boolean = false;
  @Input({transform: booleanAttribute}) isList:boolean = false;
  @Input() titleSection!:any;
  @Input() urlPlayer:string = '';
  @Input() textColor:any = '';
  @Input() index:number = 0;
  @Input() set setPost(post:Post){
    this.post.set(post);
  };
  @Input() set setPosts(posts:Post[]){
    this.posts.set(posts);
  };

  public post = signal<null | Post>(null);
  public posts = signal<null | Post[]>(null);

  public postTypes = PostMediaType;
  public screenWidth: any;

  constructor(){
    this.screenWidth = window.innerWidth;
  }


  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  public urlMedia = environment.urlMedia;


  openDialog(): void {

    if(this.isUnLock()){
        if(this.post()!.postType.name != PostMediaType.blog){
          console.log('asd')
         this.openReel();
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


  openReel(){
    console.log('index ', this.index)
    if(!this.isUnLock()) return;

      this.reelService.setSectionPost(this.posts()!, this.index);
      this.dialog.open(ReelComponent, {
        width: '100%',
        height:'100%',
        maxWidth:'100%',
        panelClass: 'full-screen-modal'
      });
  }

  likePost(){
    this.sectionService.setLikePost(this.post()!.id)?.subscribe((data:any)=> {
      this.post.update(dat=> ({...dat!, likeMe:true, countLikes: dat!.countLikes + 1}));

    })
  }

  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }

  isUnLock(){
    return this.authService.isUnLock(this.post()!);
  }


  close(){
    this.dialog.closeAll()
  }

 }
