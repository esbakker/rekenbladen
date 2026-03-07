import { Pipe, PipeTransform } from '@angular/core';
import {Entry} from '../model/config';

@Pipe({
  name: 'entrySummary',
})
export class EntrySummaryPipe implements PipeTransform {
  transform(value: Entry): string {
    return `${value.operator} van ${value.start} to ${value.end}`;
  }
}
