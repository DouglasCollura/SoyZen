import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

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

  exitSubscribe(){
    this.openOperator();
    localStorage.clear();
    this.router.navigate(['/'])
    localStorage.setItem('role', 'guest');
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
