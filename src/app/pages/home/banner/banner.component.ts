import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Roles } from '@services/auth.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    CommonModule,
    MatDivider
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {

  public roles = Roles;
  public role = localStorage.getItem('role');
 }
