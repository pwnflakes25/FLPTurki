import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genrePipe'
})
export class GenrePipePipe implements PipeTransform {

  transform(array: any[], genre: string): any[] {
    if (array === null) {
       return array;
    }

    if (genre === '') {
      return array;
    }

    const haveGenre = (blog) => {
      return blog.genres.includes(genre);
    }


    return array.filter(haveGenre);


  }

}
