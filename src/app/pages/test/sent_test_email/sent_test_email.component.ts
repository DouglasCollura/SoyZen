import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sent-test-email',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './sent_test_email.component.html',
  styleUrl: './sent_test_email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SentTestEmailComponent { }
