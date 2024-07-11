import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, CUSTOM_ELEMENTS_SCHEMA, inject, computed, AfterViewInit, Renderer2, ViewChild, TemplateRef, ElementRef, HostListener } from '@angular/core';
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

  @ViewChild('modalVideo') modalVideo!: TemplateRef<any>;
  @ViewChild('modalAudio') modalAudio!: TemplateRef<any>;
  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  @ViewChild('inputSearchHome') inputSearch: ElementRef | undefined;
  @ViewChild('menuHome') menu: ElementRef | undefined;

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

  urlPlayer:string = '';
  url_img:string = '';
  title:string = '';
  category:string = '';
  clickco=0
  public showLoadMoreButton: boolean = false;
  postsForTwoColumns:any=[]

  constructor(){
    // this.filter_options.set(filter_options_data);

  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calculateRows();
  }
 
  calculateRows() {
    const windowWidth = window.innerWidth;
    const containerWidth = (windowWidth * 0.9) - 24;
    // console.log('containerWidth', containerWidth);
    // console.log('windowWidth', windowWidth);
    let totalWidth = 0;
    let rowCount = 1;
    const marginBetweenPosts = 12; 
  
    const posts = this.sectionData();
    console.log('hola',posts)
    const postsForTwoColumns: any[] = []; // Arreglo para almacenar los posts de las dos primeras columnas
  
    for (let post of posts?.posts) {
      let postWidth = 0;
      switch (post.postType.name) {
        case 'audio':
          postWidth = 202;
          break;
        case 'video':
          postWidth = 310;
          break;
        case 'blog':
          postWidth = 372;
          break;
        default:
          postWidth = 202; 
      }
  
      if (totalWidth + postWidth + marginBetweenPosts > containerWidth) {
        rowCount++;
        totalWidth = 0;
      }
  
      totalWidth += postWidth + marginBetweenPosts;
  
      // Si el post está en las dos primeras columnas, agregarlo al arreglo
      if (rowCount <= 2) {
        postsForTwoColumns.push(post);
        // this.postsForTwoColumns.push(postsForTwoColumns)
      }
  
      // console.log('postWidth', postWidth);
      // console.log('post name', post.title);
    }
  
    console.log('postsForTwoColumns', postsForTwoColumns);
    this.postsForTwoColumns=postsForTwoColumns
    console.log('posts', posts.posts);
    // console.log('totalWidth', totalWidth);
    console.log('rowCount', rowCount);
    console.log('page detail', posts);
  
    this.showLoadMoreButton = rowCount > 2;
    console.log('entramos',this.clickco)
    if(posts.posts.length>20 || ( posts.posts.length < 20 && !posts.page && posts.posts.length > this.postsForTwoColumns.length && this.clickco==1) &&  (posts.page! >2 ||  !posts.page   )  ){
      // console.log('entramos')
      this.postsForTwoColumns=[]
      this.postsForTwoColumns=posts.posts
    }
  
    // Aquí puedes hacer lo que necesites con postsForTwoColumns, como asignarlo a una propiedad de tu clase
    // this.postsForTwoColumns = postsForTwoColumns;

    console.log('estos serian los post',this.postsForTwoColumns)
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
    this.inputSubject.next(value.target.value);
  }

  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }

  selectSection(id:number | null){
    this.sectionService.setIdCategoryHomeFilter(id);
    this.sectionService.clearIdSubCategoryHomeFilter();
    id ?  this.sectionService.filterSections(id) : this.sectionService.getSections();
  }

  selectSubCategory(id:number | null){
    this.sectionService.setIdSubCategoryHomeFilter(id);
    this.sectionService.clearPosts()
    id ?  this.sectionService.filterSections(this.sectionData().idCategoryHomeFilter,id) : this.sectionService.getSections();
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
}
