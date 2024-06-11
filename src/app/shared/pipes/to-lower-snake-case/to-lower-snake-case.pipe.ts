import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLowerSnakeCase',
  standalone: true,
})
export class ToLowerSnakeCasePipe implements PipeTransform {
  transform(words: string): string {
    return words.toLowerCase().split(' ').join('_');
  }
}
