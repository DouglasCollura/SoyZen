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
    localStorage.clear();
    this.router.navigate(['/'])
    localStorage.setItem('role', 'guest');
  }
 }
