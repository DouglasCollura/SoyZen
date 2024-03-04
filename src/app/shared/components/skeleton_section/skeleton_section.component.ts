import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-section',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './skeleton_section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonSectionComponent { }
