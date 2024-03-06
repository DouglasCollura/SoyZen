import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  styleUrls: ['./taroscope.component.scss','./taroscope-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class TaroscopeComponent { }
