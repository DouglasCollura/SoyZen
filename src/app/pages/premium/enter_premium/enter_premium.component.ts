import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-enter-premium',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatDividerModule
  ],
  templateUrl: './enter_premium.component.html',
  styleUrl: './enter_premium.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EnterPremiumComponent { }
