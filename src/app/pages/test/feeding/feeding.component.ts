import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { TestService } from '@services/test.service';

@Component({
  selector: 'app-feeding',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './feeding.component.html',
  styleUrls: ['./feeding.component.scss','./feeding-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedingComponent {
  private testService = inject(TestService)
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  constructor(){
    this.select.set(this.testService.test().feeding)
  }

  public select = signal<number| null>(null);


  nexStep(){
    this.testService.test.update(value => ({...value, feeding: this.select()! }));
    this.nextStepEmitter.emit(true);
  }
}
