import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-meditation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent
  ],
  templateUrl: './meditation.component.html',
  styleUrl: './meditation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MeditationComponent { }
