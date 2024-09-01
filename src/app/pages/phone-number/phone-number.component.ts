// phone-number.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { UserAuth } from '../../shared/interfaces/user-request.interface';
import { tap } from 'rxjs';


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

  public width: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router

  ) { }

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
            duration: 6000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass: 'snack-red'
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
        duration: 6000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass: 'snack-red'
      });
      console.error('Error al decodificar el número de teléfono', error);
      return null;
    }
  }

  logout() {
    this.authService.logout()
  }

  addPhoneNumber(phoneNumber: string | null): void {
    const userId = localStorage.getItem('userId');
    

    this.http.post<any>(`${this.urlApi}/users/addphonenumber`, { phoneNumber, userId }).subscribe({
      next: async response => {
        
        if (response) {
          if (response.status && response.data && response.data.token) {
            // cerrar sesion si la tiene activa 
            await localStorage.clear();
            // iniciar sesion con el nuevo token 

            if(response.data?.tier?.name!='guest'){
              localStorage.setItem('token', response.data.token);
            }
            // 7GCBH18T
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('role', response.data?.tier?.name)
            localStorage.setItem('userId', response.data.id.toString())
            // llevarlo al home con permisos actualizados 
            this.router.navigate(['/home']); // Redirigir al usuario a una página después de agregar el número

            this._snackBar.open(response.message, '', {
              duration: 6000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
              panelClass: 'snack-green'
            });
          }
          if(!response.status && response.message){
            await localStorage.clear();
            this.router.navigate(['/auth/login']);
            this._snackBar.open(response.message, '', {
              duration: 6000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
              panelClass: 'snack-red'
            });
          }

          const data = response.data

          //       // hacer login 
          //       this.http.post<UserAuth>(`${this.urlApi}/auth/login`, data)
          // .pipe(
          //   tap((data: UserAuth)=>{
          //     this.#authData.update(
          //       value=> ({ ...value ,userAuth: data , loading:false, role: data.tier.name})
          //     );
          //     if(data?.tier?.name!='guest'){
          //       localStorage.setItem('token', data.token);
          //     }

          //     localStorage.setItem('name', data.name);
          //     localStorage.setItem('email', data.email);
          //     localStorage.setItem('role', data?.tier?.name)
          //     localStorage.setItem('userId', data.id.toString())
          //    })
          // )

        } else {
          await localStorage.clear();
            this.router.navigate(['/auth/login']);
          this._snackBar.open('Número de teléfono no agregado', '', {
            duration: 6000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass: 'snack-red'
          });

        }
        // console.log('Número de teléfono agregado232:', response);
      },
      error: error => {
        this._snackBar.open('Error al agregar el número de teléfono', '', {
          duration: 6000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: 'snack-red'
        });
        console.error('Error al agregar el número de teléfono:', error);
         localStorage.clear();
            this.router.navigate(['/auth/login']);
      }
    });
  }
}
