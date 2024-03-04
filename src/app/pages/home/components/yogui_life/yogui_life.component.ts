import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-yogui-life',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent
  ],
  templateUrl: './yogui_life.component.html',
  styleUrl: './yogui_life.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoguiLifeComponent { }
