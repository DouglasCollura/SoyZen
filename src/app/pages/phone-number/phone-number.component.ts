// phone-number.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss'],
})
export class PhoneNumberComponent implements OnInit {
  private authService = inject(AuthService);

  phoneNumber: string | null = null;
  private _snackBar = inject(MatSnackBar);
  private urlApi = environment.apiUrl;

  public width:number = 0;
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router

    ) {}
    
    ngOnInit(): void {
      this.width = window.screen.width;
    this.route.paramMap.subscribe(params => {
      const encodedPhoneNumber = params.get('encodedPhoneNumber');
      
      if (encodedPhoneNumber) {
        this.phoneNumber = this.decodePhoneNumber(encodedPhoneNumber);
        if (this.isValidPhoneNumber(this.phoneNumber)) {
          this.addPhoneNumber(this.phoneNumber);
        } else {
          this._snackBar.open('Número de teléfono no válido.', '', {
            duration:4000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass:'snack-red'
          });
          console.error('Número de teléfono no válido');
          this.router.navigate(['/home']); 
        }
      }
    });
  }

  isValidPhoneNumber(phoneNumber: string | null): boolean {
    if (!phoneNumber) {
      return false;
    }

    const regex = /^58(412|414|424)\d{7}$/;
    return regex.test(phoneNumber);
  }

  decodePhoneNumber(encoded: string): string | null {
    try {
      return parseInt(encoded, 36).toString();
    } catch (error) {
      this._snackBar.open('Error al decodificar el número de teléfono', '', {
        duration:4000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass:'snack-red'
      });
      console.error('Error al decodificar el número de teléfono', error);
      return null;
    }
  }

  logout(){
    this.authService.logout()
  }

  addPhoneNumber(phoneNumber: string | null): void {
        const userId = localStorage.getItem('userId');

    this.http.post<any>(`${this.urlApi}/users/addphonenumber`, { phoneNumber ,  userId }).subscribe({
      next: response => {
        if (response) {
          localStorage.clear();
          this.router.navigate(['/auth/login']); // Redirigir al usuario a una página después de agregar el número
          
          this._snackBar.open('Número de teléfono agregado', '', {
            duration:4000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass:'snack-green'
          });

        }else{
            this._snackBar.open('Número de teléfono no agregado', '', {
              duration:4000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
              panelClass:'snack-red'
            });

        }
        // console.log('Número de teléfono agregado232:', response);
      },
      error: error => {
        this._snackBar.open('Error al agregar el número de teléfono', '', {
          duration:4000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass:'snack-red'
        });
        console.error('Error al agregar el número de teléfono:', error);
        this.router.navigate(['/home']);
      }
    });
  }
}
