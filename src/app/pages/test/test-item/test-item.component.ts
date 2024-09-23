import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderChange, MatSliderModule } from '@angular/material/slider';
import { BodyTest, TypeTest, AnswerTest } from '@interfaces/test.interface';
import { TestService, TestServiceData } from '@services/test.service';
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
export class TestItemComponent implements OnInit {

  @Input({ required: true }) set setTest(test: BodyTest) {
    this.test.set(test);
    (this.test()!.type == this.type_test.multiple || this.test()?.type == this.type_test.select_icon) && (this.multiList = this.test()!.answers);
    this.test()!.type == this.type_test.range && this.setRangeValues();
    this.test()!.type == this.type_test.select_single && (this.select.set(this.test()!.answers[0].id));
    this.setValueHistory()
  };
  public selectedContent = signal('');
  public selectedImage = '';
  public type_test = TypeTest;

  private testService = inject(TestService);
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  public test = signal<BodyTest | null>(null);

  // * TYPE RANGE
  public percent = new FormControl();
  public percentSignal = toSignal(this.percent.valueChanges);

  public firstValue = signal('');
  public lastValue = signal('');
  public currentSliderValue: number = 0;
  calculatedTransformValue: string = '';
  private feelings_data =
    {
      first: "assets/images/feelings/demasiado.svg",
      second: "assets/images/feelings/bastante.svg",
      three: "assets/images/feelings/algunasveces.svg",
      four: "assets/images/feelings/raravez.svg",
      five: "assets/images/feelings/poco.svg",
    }

    public feeling = computed(() => {
      const value = this.percentSignal() || 0;
      if (value <= 20) {
        return this.feelings_data.first;
      } else if (value <= 40) {
        return this.feelings_data.second;
      } else if (value <= 60) {
        return this.feelings_data.three;
      } else if (value <= 80) {
        return this.feelings_data.four;
      } else {
        return this.feelings_data.five;
      }
    });



    onSliderChange(event: any) {
      const value = event?.value || event.target?.value || 0; // Obtenemos el valor del slider
      console.log('holasdhjshjffs',event)
      // Encuentra el índice del valor correspondiente en base a la ponderación
      const index = this.test()?.answers.findIndex((answer) => value <= answer.ponderation);
      const selectedAnswer = this.test()?.answers[index!];
      console.log('respuesta',selectedAnswer)
      this.currentSliderValue = +value; 
      this.calculatedTransformValue = `translateX(-${this.currentSliderValue}%)`;
      if (selectedAnswer) {
        console.log('test',selectedAnswer)
        this.selectedContent.set(selectedAnswer.content); // Actualiza el contenido mostrado debajo del slider
        this.percent.setValue(value);
        this.currentSliderValue=selectedAnswer.ponderation
        this.calculatedTransformValue = `translateX(-${this.currentSliderValue}%)`;
       // Actualiza el valor de percent directamente
      }
    }

    getTextSlider(event:any): string {

      return `12`;
    }



  // * TYPE MULTI
  public multiList: AnswerTest[] = [];
  public multiSelected = signal<AnswerTest[]>([])


  // * SINGLE SELECT
  public select = signal<number | null>(null);

  // * SELECT ICON

  public selectIcon = signal<boolean>(false);


  questionAnswer = signal<any>(null);
  public testData = computed<TestServiceData>(() => this.testService.testData());
  public testProgress: any = computed<TestServiceData>(() => this.testService.testProgress());

  ngOnInit(): void {
    this.onSliderChange(this.percent.value || 1);
    this.calculatedTransformValue = `translateX(-${this.currentSliderValue}%)`;
    console.log('holitas',this.currentSliderValue)
   
  }

  nexStep() {
    this.test()!.type == this.type_test.select_single && this.updateProgress([this.select()]);

    if (this.test()!.type == this.type_test.range) {
      const index = this.test()?.answers.findIndex((value) => this.percent.value <= value.ponderation);
      this.updateProgress([this.test()?.answers[index!].id])
    }

    this.test()!.type == this.type_test.multiple && this.updateProgress(this.multiSelected().map(value => value.id));

    this.testService.setProgress(this.questionAnswer());

    this.testService.test.update(value => ({ ...value, focus: this.percent.value }));
    this.nextStepEmitter.emit(true);
  }


  toogleSelect(answer: AnswerTest) {

    const index = this.multiSelected().findIndex(value => value.id == answer.id);
    index < 0 ?
      this.multiSelected.update(value => [...value, answer]) :
      this.multiSelected.update(value => {
        value.splice(index, 1)
        return value;
      });
    // this.testService.test.update(value => ({...value, interests: this.multiSelected()}));

  }

  isSelected(answer: AnswerTest) {
    return this.multiSelected().findIndex(value => value.id == answer.id) > -1;
  }

  setRangeValues() {
    this.percent.setValue(0);
    this.test.update((value) => (
      {
        ...value!,
        answers: this.test()?.answers.map(
          (data, index) => (
            {
              ...data,
              ponderation: (100 / this.test()!.answers.length) * (index + 1)
            }
          )
        )!
      }));
    this.firstValue.set(this.test()!.answers[0].content);
    this.lastValue.set(this.test()!.answers[this.test()!.answers.length - 1].content);
  }

  selectFeel(feeling: any) {
    this.updateFeelingsSelect(feeling)
    // this.test.update((data) => ({
    //   ...data,
    //   feeling
    // }));

  };

  updateFeelingsSelect(feeling: any) {
    const index: number = this.test()?.answers.findIndex((value) => value.id == feeling.id)!;
    let answers: AnswerTest[] = [...this.multiList];
    answers.splice(index, 1, { ...feeling, selected: true })
    this.test.update((value) => {
      return { ...value!, answers: answers };
    })
    this.selectIcon.set(true)
    this.updateProgress([feeling.id]);
  }

  updateProgress(answers: any) {
    const questionId = this.test()?.id;
    this.questionAnswer.set({ questionId, answers });
  }

  setValueHistory() {

    const res = this.testProgress()?.guestAnswers.find((data: any) => data.questionId == this.test()!.id)

    if (res) {
      if (this.test()!.type == this.type_test.range) {
        const pond:any = this.test()!.answers.find((ans: any) => ans.id == res.answers[0])
        this.percent.setValue(pond.ponderation)
        console.log('esto',{value:pond.ponderation})
         this.onSliderChange({value:pond.ponderation});
      }
      if (this.test()!.type == this.type_test.select_icon) {
        const pond:any = this.test()!.answers.find((ans: any) => ans.id == res.answers[0])
        this.updateFeelingsSelect(pond)
      }
      if (this.test()!.type == this.type_test.select_single) {
        const pond:any = this.test()!.answers.find((ans: any) => ans.id == res.answers[0])
        this.select.set(pond.id)
      }
    }

  }
}
