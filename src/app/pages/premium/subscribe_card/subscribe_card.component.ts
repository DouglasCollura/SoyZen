import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscribe-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './subscribe_card.component.html',
  styleUrls: ['./subscribe_card.component.scss','./subscribe_card-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubscribeCardComponent {

  private formBuilder = inject(FormBuilder);


  form = this.formBuilder.group({
    type_pay:[1, ]
  })


  setValue(value:number){
    this.form.get('type_pay')?.setValue(value)
  }

  isSelected(value:number){
    return this.form.get('type_pay')?.value == value;
  }
}
