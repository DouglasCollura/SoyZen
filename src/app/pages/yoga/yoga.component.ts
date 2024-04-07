import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FilterOption } from '@interfaces/filter_option.interface';
import { filter_options_data } from '../home/data/filter_options_data';
import { MatChipsModule } from '@angular/material/chips';
import { Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatChipsModule,
    RouterModule,
    CardComponent
  ],
  templateUrl: './yoga.component.html',
  styleUrl: './yoga.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export default class YogaComponent {

  filter_options = signal<FilterOption[]>([]);
  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;

  constructor(){
    this.filter_options.set(filter_options_data);
  }

}
