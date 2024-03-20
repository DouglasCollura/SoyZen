import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { notifyItem, typeNotify } from '@interfaces/notify-item';

@Component({
  selector: 'app-nofity-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './nofity-item.component.html',
  styleUrl: './nofity-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NofityItemComponent {

  @Input({required: true}) notify!:notifyItem;

  getLogo(){
    return `/assets/images/notify/${this.notify.type == typeNotify.zen ? 'zen.png' : 'yoga.png'}`;
  }

}
