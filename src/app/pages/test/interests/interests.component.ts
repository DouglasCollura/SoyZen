import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { interests } from '@shared/helpers/data_interest.component';
import { Interest } from '@interfaces/interest.interface';
import { TestService } from '@services/test.service';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss','./interests-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class InterestsComponent {

  private testService = inject(TestService)
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  public interestList: Interest[];
  public interestSelected = signal<Interest[]>([]);

  constructor(){
    this.testService.test().interests && this.interestSelected.set(this.testService.test().interests!);
    this.interestList = interests;
  }


  toogleSelect(interest:Interest){

    const index = this.interestSelected().findIndex(value => value.id == interest.id);
    index < 0 ?
      this.interestSelected.update(value => [...value, interest]) :
      this.interestSelected.update(value=>{
        value.splice(index, 1)
        return value;
      });
    this.testService.test.update(value => ({...value, interests: this.interestSelected()}));

  }

  isSelected(interest:Interest){
    return this.interestSelected().findIndex(value => value.id == interest.id) > -1;
  }

  nextStep(){
    this.testService.test.update(value => ({
      name:'',
      focus:0,
      dream:1,
      energy:1,
      feeding:1,
      goals:0,
      kindness:1,
      patient:0,
      physical_activity:1,
      stress:0,
      behavior:1,
    }));
    this.nextStepEmitter.emit(true);
  }

 }
