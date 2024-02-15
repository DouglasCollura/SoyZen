import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SelectFeelingComponent } from './select_feeling/select_feeling.component';
import { TestProgressComponent } from './test_progress/test_progress.component';
import { FocusComponent } from './focus/focus.component';
import { BehaviorComponent } from './behavior/behavior.component';
import { InterestsComponent } from './interests/interests.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SelectFeelingComponent,
    TestProgressComponent,
    FocusComponent,
    RouterModule,
    BehaviorComponent,
    InterestsComponent
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss','./test-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default class TestComponent {

  private router = inject(Router);

  public step = signal<number>(0);
  public percent = signal<number>(0);
  public title = signal<string>('');

  nextStep(){
    if(this.step() == 4){
      this.router.navigate(['/send_test_email']);
      return
    }

    this.step.update(value => value+1);

    if(this.step() < 3){
      this.title.set("Mentalidad y Enfoque")
    }else if(this.step() == 3){
      this.title.set("Actitud y Comportamiento");
    }else{
      this.title.set("Intereses");

    }

    setTimeout(()=>{
      this.percent.update(value=>value+25);
    },300)
  }

}
