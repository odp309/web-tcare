import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTitleCase',
  standalone: true,
})
export class ToTitleCasePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((word: string) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }
}
