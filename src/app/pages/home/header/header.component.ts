import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, AfterViewInit, computed, Renderer2, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Roles } from '@services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { NofityItemComponent } from '@shared/components/nofity-item/nofity-item.component';
import { notifyItem, typeNotify } from '@interfaces/notify-item';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';
import { Subject, debounceTime } from 'rxjs';
import { SectionService, SectionServiceData } from '@services/section.service';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { PostMediaType } from '@interfaces/section_post';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import VideoplayerComponent from '../../videoplayer/videoplayer.component';
import AudioPlayerComponent from '../../audio-player/audio-player.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    FormsModule,
    RouterModule,
    NofityItemComponent,
    FooterComponent,
    VideoplayerComponent,
    AudioPlayerComponent,
    MatDialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','./header-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class HeaderComponent implements AfterViewInit {

  @ViewChild('modalVideo') modalVideo!: TemplateRef<any>;
  @ViewChild('modalAudio') modalAudio!: TemplateRef<any>;
  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  @ViewChild('inputSearch') inputSearch: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;
  private urlMedia = environment.urlMedia;
  public router = inject(Router);
  private sectionService = inject(SectionService);
  private renderer = inject(Renderer2);
  private dialog = inject(MatDialog);

  public roles = Roles;
  public role = localStorage.getItem('role');
  public listNotify: notifyItem[] = [
    {
      type: typeNotify.zen,
      title: 'Te quedan 8 días de Programa Gratis',
      time: '1 hr'
    },
    {
      type: typeNotify.yoga,
      title: '¡Es hora de tu clase de Yoga!',
      time: '1 min'
    },
    {
      type: typeNotify.meditation,
      title: 'Meditación para dormir',
      time: '3 hrs'
    },
    {
      type: typeNotify.taroscope,
      title: 'Taróscopo por Fabiola Bejarano - 26 Oct.',
      time: '2 días'
    },
    {
      type: typeNotify.peace_mind,
      title: 'Sin salud mental no hay nada',
      time: '1 sem'
    },
  ];

  public notifications = signal<notifyItem[]>([]);
  private inputSubject = new Subject<string>();
  public sectionData = computed<SectionServiceData>(()=> this.sectionService.sectionData());

  public searchText:string = '';
  public listSearch = signal<null | [] | any>(null);
  public showSearch = signal<boolean>(false);
  urlPlayer:string = '';

  constructor(){
    this.notifications.set(this.listNotify);

    this.renderer.listen('window', 'click',(e:Event)=>{
      this.showSearch() && e.target !== this.inputSearch!.nativeElement && e.target!==this.menu!.nativeElement && this.showSearch.set(false);
    })
  }

  ngAfterViewInit(): void {

    this.inputSubject.pipe(debounceTime(500)).subscribe((e:any) => {
      this.searchInvestigator(e)
    });
  }


  searchInvestigator(data:any) {
    if(data == ''){
      this.listSearch.set(null);
      this.showSearch.set(false);
      return;
    }

    this.sectionService.searchPosts(data).subscribe((data)=>{
      this.listSearch.set(data);
      this.showSearch.set(true);
      console.log(data)
    })

  }

  onInputChange(value: any) {
    this.inputSubject.next(value.target.value);
  }

  getImage(img:string){
    return `${this.urlMedia}${img}`
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }

  clearNotify(){
    this.notifications.set([])
  }

  openPost(item:any){
      console.log(item)

    if(this.isUnLock(item)){
      this.urlPlayer = item.audioUrl

      if(item.posttype == PostMediaType.audio){
        this.dialog.open(this.modalAudio, {
          width: '100%',
          height: '100%',
          // data:
          panelClass: 'full-screen-modal-player'
        });
      }

      else if(item.posttype == PostMediaType.video){
        this.urlPlayer = item.videoUrl

        this.dialog.open(this.modalVideo, {
          width: '100%',
          height: '100%',
          maxWidth:'100%',
          panelClass: 'full-screen-modal-player'
        });
      } else{
        this.router.navigateByUrl(`home/post/${item.id}`);
      }
    }else{
      this.dialog.open(this.modalEvent, {
        width: '400px',
        panelClass: 'full-screen-modal'
      });
    }
  }

  isUnLock(item:any){

    return item.tier == Roles.GUEST ||
          (item.tier == Roles.REGISTER && this.role != Roles.GUEST) ||
            (item.tier == Roles.SUBSCRIBE && this.role == Roles.SUBSCRIBE);
  }


}
