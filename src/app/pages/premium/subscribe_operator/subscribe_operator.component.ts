import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule,Router } from '@angular/router';
import {MatDialog, MatDialogModule,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-subscribe-operator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
  ],

  templateUrl: './subscribe_operator.component.html',
  styleUrls: ['./subscribe_operator.component.scss', 'subscribe_operator-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubscribeOperatorComponent { 
  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  private dialog = inject(MatDialog);
  operator:any
  private router = inject(Router);
  openDialog(operador:any): void {
   this.operator=operador
  
      this.dialog.open(this.modalEvent, {
        width: '400px',
        panelClass: 'full-screen-modal',
        
        
      });

  }
  iroperador(){
    this.dialog.closeAll()
    if(this.operator==='movistar'){
      // window.location.href="https://wap.alamano.com/sbk/lwp.html?s=1166";
      window.open("https://wap.alamano.com/sbk/lwp.html?s=1166", "_blank");
      this.router.navigateByUrl('auth/login');
    }else{
      // window.location.href="https://gprs.digitel.com.ve/suscripcionesPreview.do?idSc=100390&ac=reg";
      window.open("https://gprs.digitel.com.ve/suscripcionesPreview.do?idSc=100390&ac=reg", "_blank");
      this.router.navigateByUrl('auth/login');
    }
}

}


