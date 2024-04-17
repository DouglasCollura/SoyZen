import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
enum TypeLogin { email, movistar, digitel};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','./login-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  passwordVisible = false;
  public typeLogin= signal<TypeLogin>(TypeLogin.email);
  public typesLogin = TypeLogin;
  public codePhoneList = signal<string[]>([]);

  public form = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  public formNumber = this.formBuilder.group({
    code: ['', [Validators.required]],
    phone: [null, [Validators.required]],
  });

  login(){
    if (
      this.form.invalid
    ) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(this.form.value)
    this.router.navigate(['/home']);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  setTypeLogin(type:TypeLogin){

    this.formNumber.reset();

    if(type == TypeLogin.movistar){
      this.codePhoneList.set(['0414','0424']);
      this.typeLogin.set(TypeLogin.movistar);
      this.formNumber.get('code')?.setValue('0414');
    }else{
      this.codePhoneList.set(['0412']);
      this.typeLogin.set(TypeLogin.digitel)
      this.formNumber.get('code')?.setValue('0412');

    }
  }

  getTypeError(field: any, type: any) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched && this.form.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.form.get(field)?.invalid && this.form.get(field)?.touched
  }
 }
