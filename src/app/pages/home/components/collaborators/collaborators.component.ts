import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollaboratorsComponent { }
