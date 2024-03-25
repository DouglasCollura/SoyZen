import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BodyTest, TypeTest, answerTest } from '@interfaces/test.interface';
import { TestService } from '@services/test.service';
import { FeelingCardComponent } from '../feeling_card/feeling_card.component';

@Component({
  selector: 'app-test-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    FeelingCardComponent
  ],
  templateUrl: './test-item.component.html',
  styleUrl: './test-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestItemComponent {

  @Input({required: true}) set setTest(test:BodyTest){
    this.test.set(test);
    (this.test()!.type == this.type_test.multiple || this.test()?.type == this.type_test.select_icon) && (this.multiList = this.test()!.answer);
    this.test()!.type == this.type_test.range && this.setRangeValues();
  };
  public type_test = TypeTest;


  private testService = inject(TestService);
  @Output() nextStepEmitter = new EventEmitter<boolean>();



    public test = signal<BodyTest | null>(null);

  // * TYPE RANGE
    public percent = new FormControl();
    public percentSignal = toSignal(this.percent.valueChanges);

    public firstValue = signal('');
    public lastValue = signal('');

    private feelings_data =
    {
      hard: "assets/images/feelings/simple_estres.svg",
      medium: "assets/images/feelings/simple_not_sure.svg",
      easy: "assets/images/feelings/simple_entusiasmado.svg",
    }

    public feeling = computed(() => {
      return this.percentSignal()! < 30 ?
        this.feelings_data.hard :
        this.percentSignal()! >= 30 && this.percentSignal()! <= 70 ?
          this.feelings_data.medium : this.feelings_data.easy
    })


  // * TYPE MULTI
    public multiList: answerTest[] = [];
    public multiSelected = signal<answerTest[]>([])


  // * SINGLE SELECT
    public select = signal<number| null>(null);

  // * SELECT ICON

  public selectIcon = signal<boolean>(false);


  nexStep(){
    this.testService.test.update(value => ({...value, focus: this.percent.value }));
    this.nextStepEmitter.emit(true);
  }


  toogleSelect(answer:answerTest){

    const index = this.multiSelected().findIndex(value => value.id == answer.id);
    index < 0 ?
      this.multiSelected.update(value => [...value, answer]) :
      this.multiSelected.update(value=>{
        value.splice(index, 1)
        return value;
      });
    // this.testService.test.update(value => ({...value, interests: this.multiSelected()}));

  }

  isSelected(answer:answerTest){
    return this.multiSelected().findIndex(value => value.id == answer.id) > -1;
  }

  setRangeValues(){
    console.log(this.test()!.answer[0])
    this.percent.setValue(0);
    this.firstValue.set(this.test()!.answer[0].content);
    this.lastValue.set(this.test()!.answer[this.test()!.answer.length - 1].content);
  }

  selectFeel(feeling:any){
    this.updateFeelingsSelect(feeling)
    // this.test.update((data) => ({
    //   ...data,
    //   feeling
    // }));

  };

  updateFeelingsSelect(feeling:any){
    const index:number = this.test()?.answer.findIndex((value)=> value.img == feeling.img)!;
    let answers:answerTest[] = [...this.multiList];
    answers.splice(index, 1 , {...feeling, selected: true})
    this.test.update((value)=> {
      return {...value!, answer:answers};
    })
    this.selectIcon.set(true)
  }
}
