import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OnlyNumberDirective } from '@shared/directives/only-number.directive';
import { tap } from 'rxjs';
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
    MatFormFieldModule,
    OnlyNumberDirective
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','./login-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default class LoginComponent implements AfterViewInit {



  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  public authData = this.authService.authData;

  passwordVisible = false;
  public typeLogin= signal<TypeLogin>(TypeLogin.email);
  public typesLogin = TypeLogin;
  public codePhoneList = signal<any[]>([]);
  public errorType = signal<number | null>(null);

  public form = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  public formNumber = this.formBuilder.group({
    code: ['', [Validators.required]],
    phone: [null, [Validators.required, Validators.minLength(7)]],
  });

  ngAfterViewInit(): void {
    // this.form.valueChanges.pipe(
    //   tap(()=>{
    //     console.log('change')
    //     this.errorType.set(null)
    //   })
    // )
  }

  login(){
    if(this.typeLogin() == this.typesLogin.email){
      if (
        this.form.invalid
      ) {
        this.form.markAllAsTouched();
        return;
      }

      this.authService.login(this.form.value)
      .subscribe({
        next:()=>{
          this.router.navigate(['/home']);

        },
        error:({error})=>{
          this.authService.finalLoading()

          if(!error?.message){
            this.errorType.set(1);
            return;
          }

          (error.message == 'Invalid email' || error.message == "User not found") && this.errorType.set(1);
          error.message == "Invalid credentials" && this.errorType.set(2);
          console.log(error)

        },
        complete:()=>{
          this.authService.finalLoading()
        }
    })
    }else{
      if (
        this.formNumber.invalid
      ) {
        this.formNumber.markAllAsTouched();
        return;
      }

      this.authService.login({phoneNumber:`58${this.formNumber.value.code}${this.formNumber.value.phone}`}).subscribe({
        next:()=>{
          this.router.navigate(['/home']);
        },
        error:({error})=>{
          this.authService.finalLoading()
        },
        complete:()=>{
          this.authService.finalLoading()
        }
      })
    }

  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  setTypeLogin(type:TypeLogin){

    this.formNumber.reset();

    if(type == TypeLogin.movistar){
      this.codePhoneList.set([{code:'0414',value:'414'},{code:'0424',value:'424'}]);
      this.typeLogin.set(TypeLogin.movistar);
      this.formNumber.get('code')?.setValue('414');
    }else if(type == TypeLogin.digitel){
      this.codePhoneList.set([{code:'0412',value:'412'}]);
      this.typeLogin.set(TypeLogin.digitel)
      this.formNumber.get('code')?.setValue('412');
    }else{
      this.typeLogin.set(TypeLogin.email)
    }
  }

  getTypeError(field: any, type: any) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched && this.form.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.form.get(field)?.invalid && this.form.get(field)?.touched
  }

  getInputNumberError(field: any){
    return this.formNumber.get(field)?.invalid && this.formNumber.get(field)?.touched
  }

  getNumberFormError(field:any, type: any){
    return this.formNumber.get(field)?.invalid && this.formNumber.get(field)?.touched && this.formNumber.get(field)?.hasError(type)
  }


 }
