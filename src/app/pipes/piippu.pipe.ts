import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'piippu'
})
export class PiippuPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value/1000).toFixed(1) + ' km';
  }

}
