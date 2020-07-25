import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAndLimitPipe',
  pure: false
})
export class SortAndLimitPipePipe implements PipeTransform {

  transform(array: any[], field: string): any[] {

     if (array === null) {
        return;
     }


   array.sort((a:any, b:any) => {
     return b[field] - a[field];
   })

    array.slice(0,10);
    return array;
  }

}
