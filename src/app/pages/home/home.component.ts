import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, CUSTOM_ELEMENTS_SCHEMA, inject, computed, AfterViewInit, Renderer2, ViewChild, TemplateRef, ElementRef } from '@angular/core';
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
import { PostMediaType } from '@interfaces/section_post';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from '@services/auth.service';
import VideoplayerComponent from '../../pages/videoplayer/videoplayer.component';
import AudioPlayerComponent from '../../pages/audio-player/audio-player.component';

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
    AudioPlayerComponent
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

  public notifications = signal<notifyItem[]>([]);
  private inputSubject = new Subject<string>();
  public sectionData = computed<SectionServiceData>(()=> this.sectionService.sectionData());

  public searchText:string = '';
  public listSearch = signal<null | [] | any>(null);
  public showSearch = signal<boolean>(false);
  public sectionSelect = signal<number | null>(null);
  public subcategorySelect = signal<number | null>(null);
  private dialog = inject(MatDialog);

  urlPlayer:string = '';
  url_img:string = '';
  title:string = '';
  category:string = '';

  constructor(){
    // this.filter_options.set(filter_options_data);
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
    this.sectionSelect.set(id);
    this.subcategorySelect.set(null);
    id ?  this.sectionService.filterSections(id) : this.sectionService.getSections();
  }

  selectSubCategory(id:number | null){
    this.subcategorySelect.set(id);

    id ?  this.sectionService.filterSections(this.sectionSelect(),id) : this.sectionService.getSections();
  }

  removeFilter(){
    this.sectionSelect.set(null);
    this.subcategorySelect.set(null);
    this.sectionService.clearSubCategory()
    this.sectionService.getSections()
  }

  removeSubCategory(){
    this.subcategorySelect.set(null);
    this.sectionService.filterSections(this.sectionSelect())
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

  isUnLock(item:any){

    return item.tier == Roles.GUEST ||
          (item.tier == Roles.REGISTER && this.role != Roles.GUEST) ||
            (item.tier == Roles.SUBSCRIBE && this.role == Roles.SUBSCRIBE);
  }
  close(){
    this.dialog.closeAll()
  }
}
