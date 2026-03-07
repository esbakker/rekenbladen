import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value?: number): string {
    if (!value) {
      return '0:00';
    }

    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes}:${seconds}`;
  }
}
