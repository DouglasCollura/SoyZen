import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { BannerComponent } from '../home/banner/banner.component';
import { FilterOption } from '@interfaces/filter_option.interface';
import { filter_options_data } from '../home/data/filter_options_data';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-filter-category',
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    MatChipsModule,
    MatIconModule,
    CardComponent
  ],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export default class FilterCategoryComponent {


  filter_options = signal<FilterOption[]>([]);
  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;

  constructor(){
    this.filter_options.set(filter_options_data);
  }

}
