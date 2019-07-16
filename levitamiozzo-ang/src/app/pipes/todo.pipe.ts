import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTodo',
  pure: false
})
export class TodoPipe implements PipeTransform {

  transform(items: Array<any>, bool: boolean): any {
    return items.filter(item => item[0] == bool);
  }
}
