import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { TestService } from '@services/test.service';

@Component({
  selector: 'app-physical-activity',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './physical_activity.component.html',
  styleUrls: ['./physical_activity.component.scss','./physical_activity-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhysicalActivityComponent {

  private testService = inject(TestService)
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  constructor(){
    this.select.set(this.testService.test().kindness)
  }

  public select = signal<number| null>(null);


  nexStep(){
    this.testService.test.update(value => ({...value, kindness: this.select()! }));
    this.nextStepEmitter.emit(true);
  }
}
