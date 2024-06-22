import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromSecToMin',
})
export class FromSecToMinPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return value.toString();

    return Math.floor(value / 60) + ' m  ' + (value % 60) + ' s';
  }
}
