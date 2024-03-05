import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, effect, computed, inject, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { toSignal } from '@angular/core/rxjs-interop';
import { TestService } from '@services/test.service';


@Component({
  selector: 'app-slider-patient',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  templateUrl: './slider_patient.component.html',
  styleUrl: './slider_patient.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderPatientComponent {

  private testService = inject(TestService);
  @Output() nextStepEmitter = new EventEmitter<boolean>();


  constructor() {
    this.percent.setValue(this.testService.test().patient);
  }

  public percent = new FormControl();
  public percentSignal = toSignal(this.percent.valueChanges);
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

  nexStep(){
    this.testService.test.update(value => ({...value, patient: this.percent.value }));
    this.nextStepEmitter.emit(true);
  }
 }
