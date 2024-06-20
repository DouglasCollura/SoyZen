import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, CUSTOM_ELEMENTS_SCHEMA, inject, computed, ViewChild, ElementRef, Renderer2, AfterViewInit, TemplateRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FilterOption } from '@interfaces/filter_option.interface';
import { filter_options_data } from '../home/data/filter_options_data';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService, Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { SectionService, SectionServiceData } from '@services/section.service';
import { environment } from '../../../environments/environment';
import { SectionHomeComponent } from '../home/components/section_home/section_home.component';
import { SectionDetailSwiperComponent } from './section-detail-swiper/section-detail-swiper.component';
import { SectionDetailType } from '@interfaces/section_detail';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import VideoplayerComponent from '../videoplayer/videoplayer.component';
import AudioPlayerComponent from '../audio-player/audio-player.component';
import { ModalSubscribeAlertComponent } from '@shared/components/modal-subscribe-alert/modal-subscribe-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Post, PostMediaType } from '@interfaces/post';
import { CardArticleComponent } from '@shared/components/card_article/card_article.component';
import { ReelService } from '@services/reel.service';
import { ReelComponent } from '@shared/components/reel/reel.component';
import { SkeletonSectionComponent } from '@shared/components/skeleton_section/skeleton_section.component';

@Component({
  selector: 'app-section-detail',
  standalone: true,
  imports: [
    CommonModule,
    SectionHomeComponent,
    SectionDetailSwiperComponent,
    VideoplayerComponent,
    AudioPlayerComponent,
    ModalSubscribeAlertComponent,
    MatChipsModule,
    RouterModule,
    FormsModule,
    CardComponent,
    CardArticleComponent,
    ReelComponent,
    SkeletonSectionComponent
  ],
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss', './section-detail-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export default class SectionDetailComponent implements AfterViewInit {


  @ViewChild('modalVideo') modalVideo!: TemplateRef<any>;
  @ViewChild('modalAudio') modalAudio!: TemplateRef<any>;
  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;

  @ViewChild('inputSearchDetail') inputSearch: ElementRef | undefined;
  @ViewChild('menuDetail') menu: ElementRef | undefined;

  private routeActive = inject(ActivatedRoute);
  private sectionService = inject(SectionService);
  private renderer = inject(Renderer2);
  private authSevice = inject(AuthService);
  private router = inject(Router);

  public searchText:string = '';
  public listSearch = signal<null | [] | any>(null);
  public showSearch = signal<boolean>(false);
  private inputSubject = new Subject<string>();
  private dialog = inject(MatDialog);
  private reelService = inject(ReelService);

  filter_options = signal<FilterOption[]>([]);
  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;
  public sectionData = computed<SectionServiceData>(()=> this.sectionService.sectionData());
  public subcategorySelect = signal<number | null>(null);
  public sectionDetailType = SectionDetailType;
  public urlMedia = environment.urlMedia;
  private sanitizer = inject(DomSanitizer)
  private id:string = '';

  urlPlayer:string = '';
  url_img:string = '';
  title:string = '';
  category:string = '';


  constructor(){
    this.filter_options.set(filter_options_data);
    this.routeActive.params.subscribe(
     ({ id }) => {
      this.id = id;
      this.sectionService.getSectionDetail(id)
      this.sectionService.getSubCategories(id, true);
    }
    );

    this.renderer.listen('window', 'click',(e:Event)=>{
      this.showSearch() && e.target !== this.inputSearch!.nativeElement && e.target!==this.menu!.nativeElement && this.showSearch.set(false);
    })
  }


  ngAfterViewInit(): void {

    this.inputSubject.pipe(debounceTime(500)).subscribe((e:any) => {
      this.searchInvestigator(e)
    });
  }

  transform(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getImg(url:string | null){
    return `${this.urlMedia}${url}`;
  }


  searchInvestigator(data:any) {
    if(data == ''){
      this.listSearch.set(null);
      this.showSearch.set(false);
      return;
    }

    this.sectionService.searchPosts(data, this.id).subscribe((res) => {
      const formattedData = res.map((item:any) => {
        const searchTerms = [data]; // Replace with actual search terms
        item.title = item.title.replace(new RegExp(searchTerms.join('|'), 'gi'), (match:any) => `<b class="text-[14px] leading-[19.07px]">${match}</b>`);
        return item;
      });
      this.listSearch.set(formattedData);
      this.showSearch.set(true);

    });


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

  onInputChange(value: any) {
    this.inputSubject.next(value.target.value);
  }

  getImage(img:string){
    return `${this.urlMedia}${img}`
  }

  close(){
    this.dialog.closeAll()
  }

  isUnLock(item:any){

    return !this.authSevice.isUnLock(item);
  }

  openAlertSubscribe(){
    this.dialog.open(this.modalEvent, {
      width: 'max-content',
      height: 'max-content',
      maxWidth:'auto',

      // data:
    });
  }


  openReel(index:number, item:Post){

    if(this.isUnLock(item)) return;

    // if(this.section()?.name == 'Mood Zen del día'){
      this.reelService.setSectionPost(this.sectionData().postsDetail, index);
      this.dialog.open(ReelComponent, {
        width: '100%',
        height:'100%',
        maxWidth:'100%',
        panelClass: 'full-screen-modal'
      });
    // }
  }


  selectSubCategory(id:number | null){
    this.subcategorySelect.set(id);
    this.sectionService.clearPostDetail()
    id ?  this.sectionService.getPostDetail(id) : this.sectionService.getSectionDetail(id);
  }


  loadpaginate(){
    this.sectionService.getPostDetail(this.subcategorySelect());
  }


  removeFilter(){
    this.subcategorySelect.set(null);
    this.sectionService.clearPostDetail()
    this.sectionService.getSectionDetail(this.id)
  }
  getBackgroundImageUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
 }
