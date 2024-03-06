import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardComponent } from '@shared/components/card/card.component';
@Component({
  selector: 'app-zen-today-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
  ],
  templateUrl: './zen_today_list.component.html',
  styleUrls: ['./zen_today_list.component.scss','./zen_today_list-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ZenTodayListComponent {

 }
