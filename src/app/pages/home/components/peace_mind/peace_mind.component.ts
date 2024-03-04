import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardArticleComponent } from '@shared/components/card_article/card_article.component';

@Component({
  selector: 'app-peace-mind',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardArticleComponent
  ],
  templateUrl: './peace_mind.component.html',
  styleUrl: './peace_mind.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeaceMindComponent { }
