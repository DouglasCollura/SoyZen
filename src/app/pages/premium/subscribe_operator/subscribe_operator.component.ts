import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscribe-operator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './subscribe_operator.component.html',
  styleUrls: ['./subscribe_operator.component.scss', 'subscribe_operator-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubscribeOperatorComponent { }
