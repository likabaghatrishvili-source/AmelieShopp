import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gelPrice',
})
export class GelPricePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
