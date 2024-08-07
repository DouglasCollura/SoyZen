import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, CUSTOM_ELEMENTS_SCHEMA, inject, computed, AfterViewInit, Renderer2, ViewChild, TemplateRef, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { filter_options_data } from './data/filter_options_data';
import { FilterOption } from '@interfaces/filter_option.interface';
import { ZenTodayListComponent } from './components/zen_today_list/zen_today_list.component';
import { SkeletonSectionComponent } from '@shared/components/skeleton_section/skeleton_section.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { TaroscopeComponent } from './components/taroscope/taroscope.component';
import { YoguiLifeComponent } from './components/yogui_life/yogui_life.component';
import MeditationComponent from './components/meditation/meditation.component';
import { PeaceMindComponent } from './components/peace_mind/peace_mind.component';
import { DigitalLibraryComponent } from './components/digital_library/digital_library.component';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { SectionService, SectionServiceData } from '@services/section.service';
import { SectionHomeComponent } from './components/section_home/section_home.component';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { notifyItem } from '@interfaces/notify-item';
import { Subject, debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, Roles } from '@services/auth.service';
import VideoplayerComponent from '../../pages/videoplayer/videoplayer.component';
import AudioPlayerComponent from '../../pages/audio-player/audio-player.component';
import { CardComponent } from '@shared/components/card/card.component';
import { CardArticleComponent } from '@shared/components/card_article/card_article.component';
import { Post, PostMediaType } from '@interfaces/post';
import { ReelService } from '@services/reel.service';
import { ReelComponent } from '@shared/components/reel/reel.component';
import SwiperCore, { Swiper } from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ZenTodayListComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    SkeletonSectionComponent,
    CollaboratorsComponent,
    TaroscopeComponent,
    YoguiLifeComponent,
    MeditationComponent,
    PeaceMindComponent,
    DigitalLibraryComponent,
    FooterComponent,
    BannerComponent,
    SectionHomeComponent,
    VideoplayerComponent,
    AudioPlayerComponent,
    CardComponent,
    CardArticleComponent,
    ReelComponent

  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./home-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export default class HomeComponent implements AfterViewInit {

  deviceInfo:any = null;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  loading: boolean = false
  
  @ViewChild('inputRef') inputElement!: ElementRef;
  @ViewChild('modalVideo') modalVideo!: TemplateRef<any>;
  @ViewChild('modalAudio') modalAudio!: TemplateRef<any>;
  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  @ViewChild('inputSearchHome') inputSearch: ElementRef | undefined;
  @ViewChild('menuHome') menu: ElementRef | undefined;
  @ViewChild('selectedChip', { static: false }) selectedChip!: ElementRef;
  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiperComponent: Swiper | undefined;
  // filter_options = signal<FilterOption[]>([]);
  sectionService = inject(SectionService);
  private router = inject(Router);
  private urlMedia = environment.urlMedia;
  private renderer = inject(Renderer2);
  public role = localStorage.getItem('role');
  private authservice = inject(AuthService);

  public notifications = signal<notifyItem[]>([]);
  private inputSubject = new Subject<string>();
  public sectionData = computed<SectionServiceData>(()=> this.sectionService.sectionData());

  public searchText:string = '';
  public listSearch = signal<null | [] | any>(null);
  public showSearch = signal<boolean>(false);
  private dialog = inject(MatDialog);
  private reelService = inject(ReelService);
  isEditing: boolean = false;
  urlPlayer:string = '';
  url_img:string = '';
  title:string = '';
  category:string = '';
  clickco=0
  public showLoadMoreButton: boolean = false;
  postsForTwoColumns:any=[]

  constructor(private cdr: ChangeDetectorRef){
    // this.filter_options.set(filter_options_data);

  }

  detectDevice() {
    const userAgent = navigator.userAgent;

    this.isMobile = /Android|iPhone|iPad|Mobile/i.test(userAgent);
    this.isTablet = /iPad|Tablet/i.test(userAgent);
    this.isDesktop = !this.isMobile && !this.isTablet;
  }
  ngOnInit(){
    this.detectDevice()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calculateRows();
  }

  calculateRows() {
    const windowWidth = window.innerWidth;
    let containerWidth
    if (this.isMobile) {
       containerWidth = (windowWidth ) - 27;
    }else{
       containerWidth = (windowWidth * 0.9) - 24;

    }
    let totalWidth = 0;
    let rowCount = 1;
    const marginBetweenPosts = 1;

    const posts = this.sectionData();
    const postsForTwoColumns: any[] = []; // Arreglo para almacenar los posts de las dos primeras columnas

    for (let post of posts?.posts) {
      let postWidth = 0;
      switch (post.postType.name) {
        case 'audio':
          const pixelsAudio = (44 / 100) * windowWidth
          postWidth = this.isMobile ? pixelsAudio : 202;
          break;
        case 'video':
          const pixelsVideo = (68 / 100) * windowWidth
          postWidth = this.isMobile ? pixelsVideo : 310;
          break;
        case 'blog':
          const pixelsBlog = (68 / 100) * windowWidth
          postWidth = this.isMobile ? pixelsBlog : 372;
          break;
        default:
          postWidth =this.isMobile ? 190 : 202;
      }

      

      if (totalWidth + postWidth + marginBetweenPosts > containerWidth) {
        rowCount++;
        totalWidth = 0;
      }

      totalWidth += postWidth + marginBetweenPosts;

      // Si el post está en las dos primeras columnas, agregarlo al arreglo
      
     if (this.isMobile) {
        if (rowCount <= 4) postsForTwoColumns.push(post);
      }else{
        if (rowCount <= 2) postsForTwoColumns.push(post);
      }

      // console.log('postWidth', postWidth);
      // console.log('post name', post.title);
    }

    this.postsForTwoColumns=postsForTwoColumns
    // console.log('totalWidth', totalWidth);

    

    if (this.isMobile) {
      this.showLoadMoreButton = rowCount > 4;
    }else{
      this.showLoadMoreButton = rowCount > 2;
    }

    if(posts.posts.length>20 || ( posts.posts.length < 20 && !posts.page && posts.posts.length > this.postsForTwoColumns.length && this.clickco==1) &&  (posts.page! >2 ||  !posts.page   )  ){
      // console.log('entramos')
      this.postsForTwoColumns=[]
          this.postsForTwoColumns=posts.posts
    }
    
    // if(posts.postsDetail.length>20 &&  posts.pageDetail! >2 ||  !posts.pageDetail   ){
    //   this.postsForTwoColumns=[]
    //   // this.postsForTwoColumns=this.sectionData().postsDetail
    // }

    // Aquí puedes hacer lo que necesites con postsForTwoColumns, como asignarlo a una propiedad de tu clase
    // this.postsForTwoColumns = postsForTwoColumns;

  }



  ngAfterViewInit(): void {
    const swiperElement = this.swiperRef?.nativeElement as HTMLElement;
    this.inputSubject.pipe(debounceTime(500)).subscribe((e:any) => {
      this.searchInvestigator(e)
    });
    this.cdr.detectChanges();
  }
  scrollToChip(elementId: string, isCategory: boolean = false) {
    // setTimeout(() => {
      const selectedChip = document.getElementById(elementId);
      // if (selectedChip) {
        // const parentElement = selectedChip.parentElement;
        // if (parentElement) {
        //   if (isCategory) {
            console.log('entramos',this.swiperRef?.nativeElement)
            // this.swiperRef?.nativeElement?.slidePrev();
            this.swiperRef?.nativeElement?.slideTo(0, 500); // Scroll to the first slide
        //   } else {
        //     selectedChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        //   }
        // }
      // }
    // }, 0);
  }

  searchInvestigator(data:any) {
    if(data == ''){
      this.listSearch.set(null);
      this.showSearch.set(false);
      return;
    }


    this.sectionService.searchPosts(data).subscribe((res) => {
      const formattedData = res.map((item:any) => {
        // Assuming 'searchTerms' is an array of words to make bold
        const searchTerms = [data]; // Replace with actual search terms

        // Replace words in item.title with bold tags
        item.title = item.title.replace(new RegExp(searchTerms.join('|'), 'gi'), (match:any) => `<b class="text-[14px] leading-[19.07px]">${match}</b>`);

        return item;
      });
      this.listSearch.set(formattedData);
      this.showSearch.set(true);
    })

  }

  onInputChange(value: any) {

    if(value?.target?.value){
      this.inputSubject.next(value.target.value);
    }else{
      this.inputSubject.next(value);
    }
    
  }

  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }

  selectSection(id:number | null){
    this.sectionService.setIdCategoryHomeFilter(id);
    this.sectionService.clearIdSubCategoryHomeFilter();
    id ?  this.sectionService.filterSections(id) : this.sectionService.getSections();
    this.scrollToChip('chip-category-' + id);
  }

  selectSubCategory(id:number | null){
    this.sectionService.setIdSubCategoryHomeFilter(id);
    this.sectionService.clearPosts()
    id ?  this.sectionService.filterSections(this.sectionData().idCategoryHomeFilter,id) : this.sectionService.getSections();
    this.scrollToChip('chip-category-' + this.sectionData().idCategoryHomeFilter,true);
  }

  loadpaginate(clickt?: any){
    this.clickco=1
    this.sectionService.filterSections(this.sectionData().idCategoryHomeFilter,this.sectionData().idSubCategoryHomeFilter);
    const post=this.sectionData()

  }

  removeFilter(){
    this.sectionService.clearIdCategoryHomeFilter();
    this.sectionService.clearIdSubCategoryHomeFilter();
    this.sectionService.clearCategory()
    this.sectionService.clearSubCategory()
    this.sectionService.getSections()
  }

  removeSubCategory(){
    this.sectionService.clearIdSubCategoryHomeFilter();
    this.sectionService.filterSections(this.sectionData().idCategoryHomeFilter)
  }


  openPost(item:any){

    if(this.isUnLock(item)){
      this.urlPlayer = item.posttype=='video'? item.videoUrl : item.audioUrl
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

  openReel(index:number, item:Post){
    if(!this.isUnLock(item)) return;

    // if(this.section()?.name == 'Mood Zen del día'){
      this.reelService.setSectionPost(this.sectionData().posts, index);
      this.dialog.open(ReelComponent, {
        width: '100%',
        height:'100%',
        maxWidth:'100%',
        panelClass: 'full-screen-modal'
      });
    // }
  }

  isUnLock(item:any){
    return this.authservice.isUnLock(item);
  }
  close(){
    this.dialog.closeAll()
  }

  get showLoadMoreButton2() {
    // Llama a calculateRows() para determinar si mostrar el botón de carga
    this.calculateRows();
    return true;
  }

  closeFilterModal(){
    this.showSearch.set(false);
  }
  // enableEditing() {
  //   console.log('holaa')
  //   this.isEditing = true;
  // }
  enableEditing() {
    this.isEditing = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 0);
  }

  disableEditing(event: any) {
    this.isEditing = false;
    this.searchText = event.target.value;
    this.onInputChange(event.target.value)
  }
}
