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
import { SliderGoalsComponent } from './slider_goals/slider_goals.component';
import { SliderPatientComponent } from './slider_patient/slider_patient.component';
import { KindnessComponent } from './kindness/kindness.component';
import { SliderStressComponent } from './slider_stress/slider_stress.component';
import { DreamComponent } from './dream/dream.component';
import { PhysicalActivityComponent } from './physical_activity/physical_activity.component';
import { FeedingComponent } from './feeding/feeding.component';
import { EnergyComponent } from './energy/energy.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SelectFeelingComponent,
    TestProgressComponent,
    SliderGoalsComponent,
    FocusComponent,
    RouterModule,
    BehaviorComponent,
    InterestsComponent,
    SliderPatientComponent,
    KindnessComponent,
    SliderStressComponent,
    DreamComponent,
    PhysicalActivityComponent,
    FeedingComponent,
    EnergyComponent,
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
    if(this.step() == 12){
      this.router.navigate(['/send_test_email']);
      return
    }
    this.step.update(value => value+1);
    this.setTitlePercent();
    setTimeout(()=>{
      this.percent.update(value=>value+8.3);
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

  setTitlePercent(){

    if(this.step() < 4){
      this.title.set("Mentalidad y Enfoque")
    }else if(this.step() >= 4 && this.step() <=7){
      this.title.set("Actitud y Comportamiento");
    }else if(this.step() >= 8 && this.step() <=11){
      this.title.set("Bienestar");
    }
    else{
      this.title.set("Intereses");
    }

  }

  goBack(){
    if(this.step() > 0 ){
      this.step.update(data => data-1)
      this.setTitlePercent();
      setTimeout(()=>{
        this.percent.update(value=>value-8.3);
      },200)
    }else{
      this.router.navigate(['/']);
    }
  }

}
