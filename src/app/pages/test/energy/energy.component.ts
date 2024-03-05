import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { TestService } from '@services/test.service';

@Component({
  selector: 'app-energy',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss','./energy-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnergyComponent {
  private testService = inject(TestService)
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  constructor(){
    this.select.set(this.testService.test().energy)
  }

  public select = signal<number| null>(null);


  nexStep(){
    this.testService.test.update(value => ({...value, energy: this.select()! }));
    this.nextStepEmitter.emit(true);
  }
}
