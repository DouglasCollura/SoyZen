import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, AfterViewInit, computed, Renderer2, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { AuthService, AuthServiceData, LinkServiceData, Roles } from '@services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { NofityItemComponent } from '@shared/components/nofity-item/nofity-item.component';
import { notifyItem, typeNotify } from '@interfaces/notify-item';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';
import { Subject, debounceTime, filter, tap } from 'rxjs';
import { SectionService, SectionServiceData } from '@services/section.service';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import VideoplayerComponent from '../../videoplayer/videoplayer.component';
import AudioPlayerComponent from '../../audio-player/audio-player.component';
import { ModalSubscribeAlertComponent } from '@shared/components/modal-subscribe-alert/modal-subscribe-alert.component';
import { PostMediaType } from '@interfaces/post';
import { toSignal } from '@angular/core/rxjs-interop';

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
    ModalSubscribeAlertComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','./header-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class HeaderComponent implements AfterViewInit {

  @ViewChild('modalVideo') modalVideo!: TemplateRef<any>;
  @ViewChild('modalAudio') modalAudio!: TemplateRef<any>;
  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  @ViewChild('modalSubscribeAlert') modalSubscribeAlert!: TemplateRef<any>;

  @ViewChild('inputSearch') inputSearch: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;
  private urlMedia = environment.urlMedia;
  public router = inject(Router);
  private sectionService = inject(SectionService);
  private renderer = inject(Renderer2);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);


  public roles = Roles;
  public role = signal<string | null>('');
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

  private routeActive = inject(Router);
  public notifications = signal<notifyItem[]>([]);
  private inputSubject = new Subject<string>();
  public sectionData = computed<SectionServiceData>(()=> this.sectionService.sectionData());
  public authData = computed<AuthServiceData>(()=> this.authService.authData());
  public linkData = computed<LinkServiceData>(()=> this.authService.linkData());
  public route = toSignal(this.routeActive.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(
      (data)=> this.routeActual.set(this.router.url)
    )
)
 );

  public searchText:string = '';
  public listSearch = signal<null | [] | any>(null);
  public showSearch = signal<boolean>(false);
  public routeActual = signal<string>('');
  public nombre = signal<string | null>('');
  public email = signal<string | null>('');

  urlPlayer:string = '';
  url_img:string = '';
  title:string = '';
  category:string = '';

  constructor(){
    this.notifications.set(this.listNotify);
    this.routeActual.set(this.router.url);
    this.nombre.set(localStorage.getItem('name'));
    this.email.set(localStorage.getItem('email'));
    this.role.set( localStorage.getItem('role'));

    this.renderer.listen('window', 'click',(e:Event)=>{
      this.showSearch() && e.target !== this.inputSearch!.nativeElement && e.target!==this.menu!.nativeElement && this.showSearch.set(false);
    })
  }

  ngAfterViewInit(): void {
    this.inputSubject.pipe(debounceTime(500)).subscribe((e:any) => {
      this.searchInvestigator(e)
    });
    this.authService.getNotification();
    // this.authService.getCancelar()


  }

  searchInvestigator(data:any) {
    if(data == ''){
      this.listSearch.set(null);
      this.showSearch.set(false);
      return;
    }

    this.sectionService.searchPosts(data).subscribe((res) => {
      const formattedData = res.map((item:any) => {
        const searchTerms = [data]; // Replace with actual search terms
        item.title = item.title.replace(new RegExp(searchTerms.join('|'), 'gi'), (match:any) => `<b class="text-[14px] leading-[19.07px]">${match}</b>`);
        return item;
      });

      this.listSearch.set(formattedData);
      this.showSearch.set(true);

    });


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

  clearNotify(event:any){
    event.stopPropagation();
    this.authService.clearNotification()
  }

  openPost(item:any){


    if(this.isUnLock(item)){
      this.urlPlayer = item.audioUrl
      this.url_img = item.thumbnail
      this.title = item.title
      this.category = item.category

      if(item.posttype == PostMediaType.audio){
        this.dialog.open(this.modalAudio, {
          width: '100%',
          height: '100%',
          maxWidth:'100%',
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
          (item.tier == Roles.REGISTER && this.role() != Roles.GUEST) ||
            (item.tier == Roles.SUBSCRIBE && this.role() == Roles.SUBSCRIBE);
  }
  close(){
    this.dialog.closeAll()
  }

  openAlertSubscribe(){
    this.dialog.open(this.modalSubscribeAlert, {
      width: '100%',
        height: '100%',
        maxHeight:'420px',
        maxWidth:'505px',
      panelClass: 'panel-suscription'

      // data:
    });
  }

  showInput(){
    return !this.routeActual().includes('section')
  }

}
