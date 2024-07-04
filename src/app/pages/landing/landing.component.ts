import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss','./landing-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {

  private router = inject(Router);

  gotToHome(){

    localStorage.setItem('role', 'guest');
    this.router.navigateByUrl('/home').then(() => {
      window.location.reload();
    });
  }
}
