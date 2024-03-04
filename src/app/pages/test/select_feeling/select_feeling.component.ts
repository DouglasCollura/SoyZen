import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FeelingCardComponent } from '../feeling_card/feeling_card.component';
import { MatIconModule } from '@angular/material/icon';
import { Feelings } from '@interfaces/feelings.interface';
import { data_feeling } from '@shared/helpers/data_feeling.component';
import { TestService } from '@services/test.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-select-feeling',
  standalone: true,
  imports: [
    CommonModule,
    FeelingCardComponent,
    MatIconModule,
  ],
  templateUrl: './select_feeling.component.html',
  styleUrls: ['./select_feeling.component.scss', './select_feeling-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFeelingComponent {

  private testService = inject(TestService)
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  public feelings = signal<Feelings[]>(data_feeling);
  // public feeling = signal<Feelings | null>(null);
  public test = this.testService.test;

  constructor(){
    this.test().feeling && this.updateFeelingsSelect(this.test().feeling!);
  }


  selectFeel(feeling:Feelings){
    this.updateFeelingsSelect(feeling)
    this.test.update((data) => ({
      ...data,
      feeling
    }));

  };

  updateFeelingsSelect(feeling:Feelings){
    const index = this.feelings().findIndex((value)=> value.url_img == feeling.url_img);
    this.feelings.update(()=> {
      const new_feelings:Feelings | any = Object.values({...data_feeling,[index]:{...feeling, selected:true}});
      return new_feelings;
    })
  }

  nextStep(){
    // this.testService.test.update(value=> ({...value, feeling:this.feeling()!}));
    this.nextStepEmitter.emit(true);
  }
 }
