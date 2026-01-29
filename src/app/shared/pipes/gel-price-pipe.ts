import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gelPrice',
  standalone: true
})
export class GelPricePipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {
    const n = Number(value ?? 0);
    return `₾${n.toFixed(0)}`;
  }

}
