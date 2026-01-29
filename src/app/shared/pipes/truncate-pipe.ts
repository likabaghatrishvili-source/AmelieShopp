import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, max = 40): string {
    const s = String(value || '');
    return s.length > max ? s.slice(0, max - 1) + '…' : s;
  }
}
