import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-digital-library',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './digital_library.component.html',
  styleUrls: ['./digital_library.component.scss', './digital_library-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalLibraryComponent { }
