import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { TestService } from '@services/test.service';

@Component({
  selector: 'app-dream',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dream.component.html',
  styleUrls: ['./dream.component.scss','./dream-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DreamComponent {

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
