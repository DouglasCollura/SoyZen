import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { TestService } from '@services/test.service';

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

  private testService = inject(TestService)
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  public select = signal<number>(1);


  nexStep(){
    this.testService.test.update(value => ({...value, behavior: this.select() }));
    this.nextStepEmitter.emit(true);
  }

 }
