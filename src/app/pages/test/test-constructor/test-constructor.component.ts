import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, computed, inject, signal } from '@angular/core';
import { TestItemComponent } from '../test-item/test-item.component';
import { BodyTest, TestGet, TypeTest } from '@interfaces/test.interface';
import { Router } from '@angular/router';
import { TestService, TestServiceData } from '@services/test.service';
import { FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TestProgressComponent } from '../test_progress/test_progress.component';
import { data_feeling_constructor } from '@shared/helpers/data_feeling_constructor.component';
import { questions } from '@shared/helpers/data_test_cons.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap, map } from 'rxjs';

@Component({
  selector: 'app-test-constructor',
  standalone: true,
  imports: [
    CommonModule,
    TestItemComponent,
    MatIconModule,
    TestProgressComponent,
  ],
  templateUrl: './test-constructor.component.html',
  styleUrl: './test-constructor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TestConstructorComponent {

  private router = inject(Router);
  private testService = inject(TestService);

  public name = new FormControl('',Validators.required);
  public select_feeling = new FormControl('',Validators.required);

  public step = signal<number>(0);
  public percent = signal<number>(0);
  public title = signal<string>('');

  public index = signal<number>(0);

  public testConstructor = signal<BodyTest | null>(null);

  public testData = toSignal<BodyTest[]>(
    this.testService.getTests().pipe(
      tap(
        value=>{
          value!.questions.length > 0 && this.testConstructor.set(value!.questions[0])
        }
      ),
      map((value)=>value!.questions)
    )
  );
  public testDataService = computed<TestServiceData>(()=>this.testService.testData());


  public test = this.testService.test;


  nextStep(){
    this.testConstructor.set(null);

    if(this.index() == this.testData.length -1 ){
      this.router.navigate(['/send_test_email']);
      return
    }
    this.index.update(value => value+1);
    this.testConstructor.update(value => null)
    this.testConstructor.update(value => this.testData()![this.index()]);
    this.setTitlePercent();
    setTimeout(()=>{
      this.percent.update(value=>((100/this.testData()!.length)*this.index()+1));
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
