import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FeelingCardComponent } from '../feeling_card/feeling_card.component';
import { MatIconModule } from '@angular/material/icon';
import { Feelings } from '@interfaces/feelings.interface';
import { data_feeling } from '@shared/helpers/data_feeling.component';
@Component({
  selector: 'app-select-feeling',
  standalone: true,
  imports: [
    CommonModule,
    FeelingCardComponent,
    MatIconModule,
  ],
  templateUrl: './select_feeling.component.html',
  styleUrl: './select_feeling.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFeelingComponent {

  public feelings = signal<Feelings[]>(data_feeling);

  selectFeel(feeling:Feelings){
    const index = this.feelings().findIndex((value)=> value.url_img == feeling.url_img);
    this.feelings.update(()=> {
      const new_feelings:Feelings | any = Object.values({...data_feeling,[index]:{...feeling, selected:true}});
      return new_feelings;
    })
  }
 }
