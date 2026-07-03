import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number | string, singular: string, few: string, many: string): string {
    const count: number = typeof value === 'string' ? Number(value) : value;
    if (Number.isNaN(count)) {
      return '';
    }
    
    const remainder: number = count % 100;
    const ending: number = remainder >= 11 && remainder <= 14 ? remainder : remainder % 10;
    if (ending === 1) return `${ count } ${ singular }`;
    if (ending >= 2 && ending <= 4) return `${ count } ${ few }`;
    return `${ count } ${ many }`;
  }

}