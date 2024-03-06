import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', 'footer-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent { }
