import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feelings } from '../../../shared/interfaces/feelings.interface';
import { MatIconModule } from '@angular/material/icon';
import { AnswerTest } from '@interfaces/test.interface';
import { environment } from '../../../../environments/environment';

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

  @Input({required: true}) feeling!:Feelings | AnswerTest | any;

  constructor(){
  }
  getImage(img:string){
    return `${environment.urlMedia}${img}`;
  }
}
