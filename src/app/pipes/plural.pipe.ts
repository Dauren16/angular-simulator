import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(userCount: number, firstFormWord: string, secondFormWord: string, thirdFormWord: string): string {
    if (userCount === 1) {
      return `${ userCount } ${ firstFormWord }`;
    } else if ( userCount >= 2 && userCount <= 4) {
      return `${ userCount } ${ secondFormWord }`;
    } else {
      return `${ userCount } ${ thirdFormWord }`;
    }
  }

}
