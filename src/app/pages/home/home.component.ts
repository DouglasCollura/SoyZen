import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, CUSTOM_ELEMENTS_SCHEMA, inject, computed, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    SectionHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./home-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export default class HomeComponent implements AfterViewInit {

  // filter_options = signal<FilterOption[]>([]);
  sectionService = inject(SectionService);
  private urlMedia = environment.urlMedia;


  public notifications = signal<notifyItem[]>([]);
  private inputSubject = new Subject<string>();
  public sectionData = computed<SectionServiceData>(()=> this.sectionService.sectionData());

  public searchText:string = '';
  public listSearch = signal<null | [] | any>(null);
  public showSearch = signal<boolean>(false);
  public sectionSelect = signal<number | null>(null);

  constructor(){
    // this.filter_options.set(filter_options_data);
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

    // this.sectionService.searchPosts(data).subscribe((data)=>{
    //   this.listSearch.set(data);
    //   this.showSearch.set(true);
    //   console.log(data)
    // })
    // this.loading = true;
    // this.investigatorService.search(data)
    //   .subscribe(e => {
    //     console.log(e)
    //     this.loading = false;
    //     this.investigators = e
    //   })
    this.sectionService.searchPosts(data).subscribe((res) => {
      const formattedData = res.map((item:any) => {
        // Assuming 'searchTerms' is an array of words to make bold
        const searchTerms = [data]; // Replace with actual search terms
    
        // Replace words in item.title with bold tags
        item.title = item.title.replace(new RegExp(searchTerms.join('|'), 'gi'), (match:any) => `<b class="text-[14px] leading-[19.07px]">${match}</b>`);
    
        return item;
      });


    
      this.listSearch.set(formattedData);
    })

  }

  onInputChange(value: any) {
    this.inputSubject.next(value.target.value);
  }

  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }

  selectSection(id:number){
    this.sectionSelect.set(id);
    this.sectionService.filterSections(id);
  }

  removeFilter(){
    this.sectionSelect.set(null);
    this.sectionService.getSections()
  }
}
