import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, effect, computed } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-focus',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  templateUrl: './focus.component.html',
  styleUrl: './focus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusComponent {

  constructor() {
    this.percent.setValue(0);
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
  }

    //   {
    //   hard:{
    //     url:"assets/images/feelings/simple_estres.svg",
    //   },
    //   medium:{
    //     url:"assets/images/feelings/simple_not_sure.svg",
    //   },
    //   easy:{
    //     url:"assets/images/feelings/simple_entusiasmado.svg",
    //   }
    // }
  )


  changeValue(event: any) {
    console.log(event)
  }

}
