import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Roles } from '@services/auth.service';
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
  styleUrls: ['./peace_mind.component.scss','peace_mind-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PeaceMindComponent {

  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;

}
