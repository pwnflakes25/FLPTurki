import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPublishedPipe'
})
export class IsPublishedPipe implements PipeTransform {

  transform(array: any[]): any[] {
    if (array === null) {
       return;
    }

    return array.filter(blog => blog.isPublished === true);

  }

}
