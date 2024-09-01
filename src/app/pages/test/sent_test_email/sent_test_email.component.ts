import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sent-test-email',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './sent_test_email.component.html',
  styleUrls: ['./sent_test_email.component.scss', './send_test_email-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SentTestEmailComponent {
  passwordVisible = false;
  emailForm: FormGroup;
  private router = inject(Router);
  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  public errMessage = signal<string | null>(null);
  public resumenData = signal<any>(null);  // Usamos una señal para almacenar el resumen
  public computedResumen = computed(() => this.resumenData());

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      name: [localStorage.getItem('name')],
      uuidtoken: [localStorage.getItem('uuidToken')],
    });
  }

  ngAfterViewInit(){
    this.emailForm.valueChanges.pipe(
      tap(() => {
        if (this.errMessage()) {
          this.errMessage.set(null);
        }
      })
    ).subscribe();
    this.loadResume();  // Cargamos el resumen al inicializar
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  loadResume() {
    const uuidToken = localStorage.getItem('uuidToken');
    if (uuidToken) {
      this.authService.getResumen(uuidToken).subscribe({
        next: (value) => {
          this.resumenData.set(value.content);  // Actualizamos la señal con el resumen
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Ha ocurrido un error';
          this.errMessage.set(errorMessage);
          this.authService.finalLoading();
        }
      });
    }
  }
  

  save() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    if (this.emailForm.valid) {
      const formData = this.emailForm.value;
      this.authService.signup(formData).subscribe({
        next: (response) => {
          this._snackBar.open('Has sido registrado exitosamente.', '', {
            duration: 5000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
          console.log('respuesta',response)
          localStorage.setItem('name', JSON.parse(JSON.stringify(response)).name);
          localStorage.setItem('token', JSON.parse(JSON.stringify(response)).token);
          localStorage.setItem('email', JSON.parse(JSON.stringify(response)).email);
          localStorage.setItem('role', JSON.parse(JSON.stringify(response))?.tier?.name)
          localStorage.setItem('userId', JSON.parse(JSON.stringify(response)).id.toString())
          if(JSON.parse(JSON.stringify(response)).programId>0){
            this.router.navigate(['/home/section',JSON.parse(JSON.stringify(response)).programId]);
          }else{
            this.router.navigate(['/home'])
          }

        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Ha ocurrido un error';
          this.errMessage.set(errorMessage);
          this.authService.finalLoading();
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  limitPasswordInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 10) {
      input.value = input.value.substring(0, 10);
    }
  }

  getTypeError(field: any, type: any) {
    return this.emailForm.get(field)?.invalid && this.emailForm.get(field)?.touched && this.emailForm.get(field)?.hasError(type);
  }

  getInputError(field: any) {
    return this.emailForm.get(field)?.invalid && this.emailForm.get(field)?.touched;
  }
}
