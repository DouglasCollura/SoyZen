import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, TemplateRef, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Roles } from '@services/auth.service';
import { CardArticleComponent } from '@shared/components/card_article/card_article.component';
import { SectionService, SectionServiceData } from '@services/section.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { Post } from '@interfaces/post';
import { Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    CardArticleComponent,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss','./post-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export default class PostComponent  implements OnInit{
  deviceInfo:any = null;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;

  $audio!: HTMLAudioElement;

  private vgPlayer:VgApiService | undefined;
  public isPlaying = signal(false);

  post = signal<any>(null);
  section = signal<any>([])
  idpost:any
  idsection:any
  potsitos = signal<any>([])
  private role = localStorage.getItem('role');
  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;
  private urlMedia = environment.urlMedia;

  private router = inject(Router);
  private sectionService = inject(SectionService)
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService
    ) {}
  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
    console.log('deviceInfo',this.deviceInfo);
    console.log('isMobile',this.isMobile); 
    console.log('isTablet',this.isTablet); 
    console.log('isDesktop',this.isDesktop); 
    

    this.activatedRoute.params.subscribe(param => {
      this.idpost=param['idPost']
      this.idsection=param['idSection']
      this.loadPost(param['idPost'])
      this.loadSection(param['idSection']);
    })
  }

  onPlayerReady(api: VgApiService) {
    this.vgPlayer = api;
  }
  sanitizeContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  loadPost(id:any){
    this.sectionService.getPost(id).subscribe((data)=>{

      this.post.set(data);
      console.log(this.post())
      this.viewPost()

    })
  }
  loadSection(id:any){
    this.sectionService.getSection(id).subscribe((data)=>{
       this.potsitos.set(data.posts);


      this.section.set(data.posts.filter(post => post.id != this.idpost))


    })
  }
  goToPreviousPost() {
    const previousIndex = this.potsitos().findIndex((post:any) => post.id == this.idpost) - 1;
    if (previousIndex >= 0) {
      this.idpost = this.potsitos()[previousIndex].id;
      this.router.navigate([`home/post/${this.idpost}/${this.idsection}`]);

    }
  }

  goToNextPost() {
    const nextIndex = this.potsitos().findIndex((post:any) => post.id == this.idpost) + 1;

    if (nextIndex < this.potsitos().length) {
      this.idpost = this.potsitos()[nextIndex].id;
      this.router.navigate([`home/post/${this.idpost}/${this.idsection}`]);

    }
  }

  playPause(){
    this.isPlaying() ?
      this.vgPlayer?.pause() :
      this.vgPlayer?.play();
    this.isPlaying.update(e=> !e);
  }

  getImg2(url:string){
    return `${this.urlMedia}${url}`;
  }

  getImgDesktop(post:any){
    if (post.coverWeb) {
      return this.getImg2(post.coverWeb)
    }else{
      return this.getImg2(post.thumbnail)
    }
  }
  getImgMobile(post:any){
    if (post.thumbnail) {
      return this.getImg2(post.thumbnail)
    }else{
      return this.getImg2(post.coverWeb)
    }
  }

  isUnLock(item:Post){

    return item.tier?.name == Roles.GUEST ||
          (item.tier?.name == Roles.REGISTER && this.role != Roles.GUEST) ||
            (item.tier?.name == Roles.SUBSCRIBE && this.role == Roles.SUBSCRIBE);
  }


  viewPost(){
    this.sectionService.setViewPost(this.post()!.id)?.subscribe()
  }


}
