import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { CardComponent } from '@shared/components/card/card.component';
@Component({
  selector: 'app-taroscope',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    CardComponent
  ],
  templateUrl: './taroscope.component.html',
  styleUrl: './taroscope.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaroscopeComponent { }
