import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'appDiffDateTime',
  standalone: true,
})
export class DiffDateTimePipe implements PipeTransform {

  transform(date: string): string {
    const now = dayjs();
    const dateOrder = dayjs(date);

    const difM = now.diff(dateOrder, 'minute');
    const difH = now.diff(dateOrder, 'hour');
    const difD = now.diff(dateOrder, 'day');
    const difW = now.diff(dateOrder, 'week');

    if (difW > 0) {
      return difW + ' sem';
    } else if (difD > 0) {
      return difD + ' ' + (difD > 1 ? 'días' : 'día');
    } else if (difH > 0) {
      return difH + ' hr';
    } else if (difM > 0) {
      return difM + ' min';
    } else {
      return '0 min';
    }
  }

}
