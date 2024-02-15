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
  styleUrl: './interests.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class InterestsComponent {

  private testService = inject(TestService)
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  public interestList: Interest[];
  public interestSelected = signal<Interest[]>([]);

  constructor(){
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
  }

  isSelected(interest:Interest){
    return this.interestSelected().findIndex(value => value.id == interest.id) > -1;
  }

  nextStep(){
    this.testService.test.update(value => ({...value, interests: this.interestSelected()}));
    this.nextStepEmitter.emit(true);
  }

 }
