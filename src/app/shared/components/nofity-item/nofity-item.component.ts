import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { notifyItem, typeNotify } from '@interfaces/notify-item';
import { DiffDateTimePipe } from '@shared/pipe/diff-date-time.pipe';
import { environment } from '../../../../environments/environment';

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
  private urlMedia = environment.urlMedia;
  @Input({required: true}) notify!:any;

  getLogo(){
    
    // return `/assets/images/notify/${this.notify.type == typeNotify.zen ? 'zen.png' : 'yoga.png'}`;
  }
  getImg(url:string){
    if(url){
      return `${this.urlMedia}${url}`;
    }else{
      return `/assets/images/notify/zen.png`;
    }
    
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
}
