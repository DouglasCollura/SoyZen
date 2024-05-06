import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef, ViewChild, booleanAttribute, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import VideoplayerComponent from '../../../pages/videoplayer/videoplayer.component';
import { PostMediaType } from '@interfaces/section_post';
import AudioPlayerComponent from '../../../pages/audio-player/audio-player.component';



@Component({
  selector: 'app-card-article',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    VideoplayerComponent,
    AudioPlayerComponent
  ],
  templateUrl: './card_article.component.html',
  styleUrls: ['./card_article.component.scss','./card_article-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardArticleComponent {

  private dialog = inject(MatDialog);
  private router = inject(Router);


  @Input({transform: booleanAttribute}) isNew:boolean = false;
  @Input({transform: booleanAttribute}) isLock:boolean = false;
  @Input({transform: booleanAttribute}) isList:boolean = false;
  @Input({required: true}) title!:string;
  @Input() time!:string | null;
  @Input() category!:string | null;
  @Input({required: true}) url_img!:string;
  @Input() user:any = null;
  @Input() idSection:any = null;
  @Input() idPost:any = null;
  @Input() type:string = 'blog';
  @Input() textColor:any = '';
  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  public urlMedia = environment.urlMedia;


  openDialog(): void {

    if(!this.isLock){

        this.router.navigateByUrl('home/post/'+this.idPost+'/'+this.idSection);

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
  close(){
    this.dialog.closeAll()
  }
 }
