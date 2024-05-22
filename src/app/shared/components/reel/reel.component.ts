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

  @ViewChild('swiper', { static: true }) swiperRef: ElementRef | undefined;
  swiperComponent: Swiper | undefined;
  private reelService = inject(ReelService);
  private authService = inject(AuthService);
  public postType = PostMediaType;
  public reelDataService = computed<SectionReelService>(()=>this.reelService.reelDataService());

  public controlPause = signal<any>(null);
  public screenWidth: any;

  constructor(){
    this.controlPause.set(this.reelDataService().sectionPost?.map(e => ({...e, pause:false})));
    this.screenWidth = window.innerWidth;
    this.swiperParams.direction = this.screenWidth > 500 ? 'horizontal' : 'vertical'
  }

  ngAfterViewInit(): void {
    this.swiperComponent = this.swiperRef?.nativeElement.swiper
    setTimeout(()=>{
      this.swiperComponent?.slideTo(this.reelService.reelDataService().indexSection!, 0);
    },100)

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
    return index < this.reelDataService().sectionPost?.length!
  }


  nexMedia(index:number){
    console.log(index < this.reelDataService().sectionPost?.length!)
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
    console.log(index < this.reelDataService().sectionPost?.length!)
    if(this.canPrev(index)){
      setTimeout(()=>{
        this.swiperComponent?.slidePrev();
      },100)
    }

  }
}
