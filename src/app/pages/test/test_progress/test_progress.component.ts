import { CommonModule,  } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-test-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './test_progress.component.html',
  styleUrl: './test_progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestProgressComponent {
  @Input({required: true}) percent!:number;
  @Input({required: true}) title!:string;




  constructor(){
    setTimeout(()=>{
      // this.percent = 25;
    },200);
  }
 }
