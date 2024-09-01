import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { tap } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterModule,
    MatSnackBarModule,
    MatBottomSheetModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './signup-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignupComponent implements AfterViewInit{
  @ViewChild('modalInfo') modalInfo!: TemplateRef<any>;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  public errMessage = signal<string | null>(null);
  private _snackBar = inject(MatSnackBar);
  public authData = this.authService.authData;
  passwordVisible = false;
  public form = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required,  Validators.minLength(6)]]
    // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$'),
  });
  private  _bottomSheet = inject(MatBottomSheet);


  ngAfterViewInit(){
    this.form.valueChanges.pipe(
      tap(()=>{
        this.errMessage() && this.errMessage.set(null)
      })
    ).subscribe()
  }

  
  openBottomSheet(): void {
    this._bottomSheet.open(this.modalInfo);
  }

  closeSheet(): void {
    this._bottomSheet.dismiss();
  }

  signup(){
    if (
      this.form.invalid
    ) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.signup(this.form.value).subscribe(
      {
        next:(value) => {
          this._snackBar.open('Has sido registrado exitosamente.', '', {
            duration:5000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
          this.router.navigate(['/auth/account-success']);
        },
        error:(err) => {
          err?.error?.message ? this.errMessage.set(err?.error?.message) : this.errMessage.set('ha ocurrido un error');
          this.authService.finalLoading()
        },
      }
    )

  }

  limitPasswordInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 10) {
      input.value = input.value.substring(0, 10);
    }
  }
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
