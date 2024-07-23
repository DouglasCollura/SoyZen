import { Pipe, type PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'appDiffDateTime',
  standalone: true,
})
export class DiffDateTimePipe implements PipeTransform {

  transform(date: string): string {
    let dateOrder = moment(date).format('YYYY-MM-DD HH:mm');

    let difM = moment().diff(dateOrder, 'minute');
    let difH = moment().diff(dateOrder, 'hours');
    let difD = moment().diff(dateOrder, 'day');
    if (difM === 0) {
      return '0 minutos';
    } else if (difM > 0 && difM < 59) {
      return difM + ' minutos';
    } else if (difH > 0 && difH < 23) {
      let mt = difH * 60;
      let mr = difM - mt;
      let mrt = mr > 0 ? (mr < 10 ? '0' + mr : mr) : 0;
      return difH + ' H ' + mrt + ' Min';
    }
    return difD + ' Dias';
  }

}
