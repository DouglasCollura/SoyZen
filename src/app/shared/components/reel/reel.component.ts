import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import AudioPlayerComponent from '../../../pages/audio-player/audio-player.component';
import VideoplayerComponent from '../../../pages/videoplayer/videoplayer.component';
import { ReelService, SectionReelService } from '@services/reel.service';
import { Post, PostMediaType, PostType, SectionPost } from '@interfaces/section_post';
import { Swiper, SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '@shared/directives/fmSwiper.directive';
import { AuthService } from '@services/auth.service';

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

  constructor(){
    this.controlPause.set(this.reelDataService().sectionPost?.posts.map(e => ({...e, pause:false})));
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
    direction:'vertical',
    slidesPerView:1,
    loop:false,
    init:false,
    initialSlide:1,
  };

  isLock(item:Post){
    return !this.authService.isUnLock(item);
  }

}
