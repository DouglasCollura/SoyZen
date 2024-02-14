import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interests } from '@shared/helpers/data_interest.component';
import { Interest } from '@interfaces/interest.interface';

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

  public interestList: Interest[];
  public interestSelected:Interest[] = [];

  constructor(){
    this.interestList = interests;
  }


  toogleSelect(interest:Interest){
    const index = this.interestSelected.findIndex(value => value.id == interest.id);
    index < 0 ? this.interestSelected.push(interest) : this.interestSelected.splice(index, 1);
  }

  isSelected(interest:Interest){
    return this.interestSelected.findIndex(value => value.id == interest.id) > -1;
  }

 }
