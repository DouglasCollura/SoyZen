import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import HeaderComponent from '../../../../pages/home/header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './base_layout.component.html',
  styleUrl: './base_layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BaseLayoutComponent { }
