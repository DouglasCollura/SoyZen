import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import AudioPlayerComponent from '../../../pages/audio-player/audio-player.component';
import VideoplayerComponent from '../../../pages/videoplayer/videoplayer.component';
import { ReelService, SectionReelService } from '@services/reel.service';
import {  SectionPost } from '@interfaces/section_post';
import { Swiper, SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '@shared/directives/fmSwiper.directive';
import { AuthService } from '@services/auth.service';
import { Post, PostMediaType } from '@interfaces/post';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reel',
  standalone: true,
  imports: [
    CommonModule,
    AudioPlayerComponent,
    VideoplayerComponent,
    SwiperDirective
  ],
  templateUrl: './reel.component.html',
  styleUrl: './reel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ReelComponent implements AfterViewInit{

  deviceInfo:any = null;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  public urlMedia = environment.urlMedia;


  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiperComponent: Swiper | undefined;
  private reelService = inject(ReelService);
  private authService = inject(AuthService);
  public postType = PostMediaType;
  public reelDataService = computed<SectionReelService>(()=>this.reelService.reelDataService());

  public controlPause = signal<any>(null);
  public screenWidth: any;
  showSwiper = signal<boolean>(false);


  constructor(){
    this.controlPause.set(this.reelDataService().sectionPost?.map(e => ({...e, pause:false})));
    this.screenWidth = window.innerWidth;
    this.swiperParams.direction = this.screenWidth > 500 ? 'horizontal' : 'vertical';
  }

  detectDevice() {
    const userAgent = navigator.userAgent;

    this.isMobile = /Android|iPhone|iPad|Mobile/i.test(userAgent);
    this.isTablet = /iPad|Tablet/i.test(userAgent);
    this.isDesktop = !this.isMobile && !this.isTablet;
  }
  ngOnInit(): void {
        this.detectDevice()
  }

  ngAfterViewInit(): void {
    const swiperElement = this.swiperRef?.nativeElement as HTMLElement;
    const swiperElementparent = swiperElement.parentElement  as HTMLElement;
    const swiperElementparent2 = swiperElementparent.parentElement  as HTMLElement;
    const swiperElementparent3 = swiperElementparent2.parentElement  as HTMLElement;

    this.swiperComponent = this.swiperRef?.nativeElement.swiper
    swiperElementparent3?.classList.add('modal-opacity')
    setTimeout(()=>{
      this.swiperComponent?.slideTo(this.reelService.reelDataService().indexSection!, 0);
      this.showSwiper.set(true); // Mostrar el Swiper después del setTimeout
    swiperElementparent3?.classList.remove('modal-opacity')
    },200)

    this.swiperComponent?.on('slideChange', (event) => {
      let newControl = this.controlPause();
      newControl[event.previousIndex].pause = true;
      newControl[event.activeIndex].pause = false;
      this.controlPause.update(value=> newControl)
    })

  }


  public swiperParams: SwiperOptions = {
    slidesPerView:1,
    loop:false,
    init:false,
    initialSlide:1,
  };

  isLock(item:Post){
    return !this.authService.isUnLock(item);
  }


  canNext(index:number){
    return index < this.reelDataService().sectionPost?.length! - 1
  }


  nexMedia(index:number, isModal:boolean = true){
    if(!isModal && !this.canNext(index)){
      this.prevMedia(index);
      return;
    }
    if(this.canNext(index)){
      setTimeout(()=>{
        this.swiperComponent?.slideNext();
      },100)
    }

  }

  canPrev(index:number){
    return index > 0
  }


  prevMedia(index:number){
    if(this.canPrev(index)){
      setTimeout(()=>{
        this.swiperComponent?.slidePrev();
      },100)
    }

  }

  getBgByUrl(url:string | null){
      return `url(${this.urlMedia}${url})`;
  }
}
