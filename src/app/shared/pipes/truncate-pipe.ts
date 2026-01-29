import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | number | null | undefined, max = 40): string {
    const s = String(value ?? '');

    const m = Number(max);
    if (!Number.isFinite(m) || m <= 0) return '';

    if (s.length <= m) return s;

    // თუ max ძალიან პატარაა, უბრალოდ წერტილები
    if (m <= 1) return '…';

    return s.slice(0, m - 1) + '…';
  }

}
