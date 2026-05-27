import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  transform(count: number, firstForm: string, secondForm: string, thirdForm: string): string {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${count} ${thirdForm}`;
    if (lastDigit === 1) return `${count} ${firstForm}`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${count} ${secondForm}`;
    return `${count} ${thirdForm}`;
  }

}
