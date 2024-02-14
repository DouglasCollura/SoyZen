import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feelings } from '../../../shared/interfaces/feelings.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-feeling-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './feeling_card.component.html',
  styleUrl: './feeling_card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeelingCardComponent {

  @Input({required: true}) feeling!:Feelings;

}
