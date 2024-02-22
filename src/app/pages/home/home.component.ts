import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { filter_options_data } from './data/filter_options_data';
import { FilterOption } from '@interfaces/filter_option.interface';
import { ZenTodayListComponent } from './components/zen_today_list/zen_today_list.component';
import { SkeletonSectionComponent } from '@shared/components/skeleton_section/skeleton_section.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { TaroscopeComponent } from './components/taroscope/taroscope.component';
import { YoguiLifeComponent } from './components/yogui_life/yogui_life.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ZenTodayListComponent,
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatChipsModule,
    MatIconModule,
    SkeletonSectionComponent,
    CollaboratorsComponent,
    TaroscopeComponent,
    YoguiLifeComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./home-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {

  filter_options = signal<FilterOption[]>([]);

  constructor(){
    this.filter_options.set(filter_options_data);
  }

  change(event:any){
    console.log(event)
  }
}
