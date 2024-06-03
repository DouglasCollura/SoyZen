import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './signup-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignupComponent {

  private formBuilder = inject(FormBuilder);

  passwordVisible = false;
  public form = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  getTypeError(field: any, type: any) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched && this.form.get(field)?.hasError(type)
  }
  getInputError(field: any){
    return this.form.get(field)?.invalid && this.form.get(field)?.touched
  }
}
