import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celice',
  standalone: true
})
export class CelicePipe implements PipeTransform {

  transform(value: number): any {
    return (value-273.15).toFixed(2);
  }

}
