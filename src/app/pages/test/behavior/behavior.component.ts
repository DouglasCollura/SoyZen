import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-behavior',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './behavior.component.html',
  styleUrl: './behavior.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BehaviorComponent {

  public select = signal<number>(1);

 }
