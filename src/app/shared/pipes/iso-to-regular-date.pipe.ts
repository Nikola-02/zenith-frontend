import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoToRegularDate',
})
export class IsoToRegularDatePipe implements PipeTransform {
  transform(value: string): string {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'medium');
    return formattedDate || value;
  }
}
