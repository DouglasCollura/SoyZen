import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SelectFeelingComponent } from './select_feeling/select_feeling.component';
import { TestProgressComponent } from './test_progress/test_progress.component';
import { FocusComponent } from './focus/focus.component';
import { BehaviorComponent } from './behavior/behavior.component';
import { InterestsComponent } from './interests/interests.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestService } from '@services/test.service';

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
    InterestsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss','./test-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default class TestComponent {

  private router = inject(Router);
  private testService = inject(TestService)

  public name = new FormControl('',Validators.required);
  public select_feeling = new FormControl('',Validators.required);

  public step = signal<number>(0);
  public percent = signal<number>(0);
  public title = signal<string>('');


  public test = this.testService.test;

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
    },200)
  }

  formInvalid(){
    return this.name.invalid && this.name.touched
  }

  canNext(){
    if(this.name.invalid){this.name.markAllAsTouched(); return;}
    this.testService.test.update(test=> ({...test,name:this.name.value!}));
    this.nextStep()
  }

  goBack(){
    if(this.step() > 0 ){
      this.step.update(data => data-1)
      setTimeout(()=>{
        this.percent.update(value=>value-25);
      },200)
    }else{
      this.router.navigate(['/']);
    }
  }

}
