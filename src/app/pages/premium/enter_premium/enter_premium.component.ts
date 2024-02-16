import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-enter-premium',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './enter_premium.component.html',
  styleUrl: './enter_premium.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterPremiumComponent { }
