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

  isNew2(createdAt: any): boolean {
    const createdDate = new Date(createdAt);
    
    // Obtenemos solo la parte de la fecha (sin horas)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece la hora a 00:00 para hoy
    createdDate.setHours(0, 0, 0, 0); // Establece la hora a 00:00 para la fecha de creación
  
    const diffInDays = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    
    console.log('Diferencia de días:', diffInDays, 'Fecha de creación:', createdDate, 'Es nuevo (<= 2 días):', diffInDays <= 2);
  
    return diffInDays <= 2;
  }
  
  openDialog(): void {

    if(this.isUnLock()){
        if(this.post()!.postType.name != PostMediaType.blog && this.post()!.postType.name != PostMediaType.ads ){
         this.openReel();
        }else if(this.post()!.postType.name == PostMediaType.ads){
          if (this.post()!.postDetail?.adsUrl && this.post()!.postDetail?.adsUrl != '') {
            this.goToAds(this.post()!.postDetail?.adsUrl)
          }
        }else{
          this.router.navigateByUrl('home/post');
        }
    }else{
      this.dialog.open(this.modalEvent, {
        width: '400px',
        panelClass: 'full-screen-modal'
      });
    }

  }
  goToAds(url:string){
    window.open(url, '_blank');
  }

  openReel(){
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
    if(this.post()?.likeMe){
      this.sectionService.deleteLikePost(this.post()!.id)?.subscribe((data:any)=> {
        this.post.update(dat=> ({...dat!, likeMe:false, countLikes: dat!.countLikes - 1}));
      })
    }else{
      this.sectionService.setLikePost(this.post()!.id)?.subscribe((data:any)=> {
        this.post.update(dat=> ({...dat!, likeMe:true, countLikes: dat!.countLikes + 1}));
      })
    }

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

  extractAndRoundTime(input:string | undefined | null) {
    if (input == null || input == undefined) {
      return null
    }
    const match = input.match(/^([\d.]+)([a-zA-Z]+)$/);

    if (match) {
        const number = Math.floor(parseFloat(match[1]));
        const unit = match[2];

        return `${number} ${unit}`;
    } else {
        // Si el formato no es correcto, retornamos null o algún mensaje de error
        return null;
    }
}

 }
