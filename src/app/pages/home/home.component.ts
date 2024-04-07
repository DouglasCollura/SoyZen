import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, CUSTOM_ELEMENTS_SCHEMA, inject, computed } from '@angular/core';
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


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ZenTodayListComponent,
    CommonModule,
    RouterModule,
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
export default class HomeComponent {

  filter_options = signal<FilterOption[]>([]);
  sectionService = inject(SectionService);
  public sectionDataService = computed<SectionServiceData>(()=>this.sectionService.sectionData());

  constructor(){
    this.filter_options.set(filter_options_data);
  }

  change(event:any){
    console.log(event)
  }
}
