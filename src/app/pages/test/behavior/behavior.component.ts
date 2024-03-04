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
  styleUrls: ['./behavior.component.scss','./behavior-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BehaviorComponent {

  private testService = inject(TestService)
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  constructor(){
    this.select.set(this.testService.test().behavior)
  }

  public select = signal<number| null>(null);


  nexStep(){
    this.testService.test.update(value => ({...value, behavior: this.select()! }));
    this.nextStepEmitter.emit(true);
  }

 }
