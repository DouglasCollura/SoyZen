import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, computed, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionService, SectionServiceData } from '@services/section.service';
import { AuthService, AuthServiceData, LinkServiceData, Roles } from '@services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-modal-subscribe-alert',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './modal-subscribe-alert.component.html',
  styleUrl: './modal-subscribe-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalSubscribeAlertComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  public linkData = computed<LinkServiceData>(()=> this.authService.linkData());
  constructor(private http: HttpClient){}

  ngAfterViewInit(): void {
    // this.authService.getCancelar()
    
    
  }
  // linkData().link?.link 
  exitSubscribe(){
    this.authService.getCancelar()

  }
  exitSubscribe2(link:any){
    
    this.http.get<any>(`${link}`)
    .subscribe((data)=>{
      if(data.respenvio==='ok'){

        this._snackBar.open(data.msj, '', {
          duration:2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
        localStorage.clear();
        // window.open(`${link}`, "_blank");
        this.router.navigate(['/'])
        localStorage.setItem('role', 'guest');

      }else{
        this._snackBar.open(data.msj, '', {
          duration:2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      }
  

    },(error:any)=>{
      console.log('error',error);
      
    })

    // localStorage.clear();
    // window.open(`${link}`, "_blank");
    // this.router.navigate(['/'])
    // localStorage.setItem('role', 'guest');
  }

  openOperator(){
    let phone:string = localStorage.getItem('phone')!;

    if(phone.includes('58412')){
      window.open(`https://gprs.digitel.com.ve/suscripcionesPreview.do?idSc=100390&ac=eli&s=${phone}`, "_blank");
    }else{
      window.open(`https://wap.alamano.com/sbk/servicios/cancelarSuscripcionwpecpt.jsp?s=1166&o=27&tlf=${phone}`, "_blank");
    }
  }
 }
