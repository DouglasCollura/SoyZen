import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-card-article',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './card_article.component.html',
  styleUrl: './card_article.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardArticleComponent {

  @Input({transform: booleanAttribute}) new:boolean = false;
  @Input({required: true}) title!:string;
  @Input({required: true}) url_img!:string;


}
