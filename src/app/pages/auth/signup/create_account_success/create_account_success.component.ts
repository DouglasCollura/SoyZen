import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-account-success',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './create_account_success.component.html',
  styleUrl: './create_account_success.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateAccountSuccessComponent { }
