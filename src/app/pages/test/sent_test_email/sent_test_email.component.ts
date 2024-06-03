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
  styleUrls: ['./sent_test_email.component.scss', './send_test_email-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class SentTestEmailComponent {
  passwordVisible = false;
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
 }
