import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { notifyItem, typeNotify } from '@interfaces/notify-item';
import { DiffDateTimePipe } from '@shared/pipe/diff-date-time.pipe';

@Component({
  selector: 'app-nofity-item',
  standalone: true,
  imports: [
    CommonModule,
    DiffDateTimePipe
  ],
  templateUrl: './nofity-item.component.html',
  styleUrl: './nofity-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NofityItemComponent {

  @Input({required: true}) notify!:any;

  getLogo(){
    return `/assets/images/notify/zen.png`;
    // return `/assets/images/notify/${this.notify.type == typeNotify.zen ? 'zen.png' : 'yoga.png'}`;
  }

}
