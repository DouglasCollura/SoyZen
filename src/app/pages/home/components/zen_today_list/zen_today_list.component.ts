import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-zen-today-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent
  ],
  templateUrl: './zen_today_list.component.html',
  styleUrl: './zen_today_list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZenTodayListComponent {


 }
