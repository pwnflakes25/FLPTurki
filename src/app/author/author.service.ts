import { Injectable } from '@angular/core';
import {Author} from './author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
authors: Author[] = [
  {
    id: '1',
    fullName: 'Firghi',
    profileImageUrl: 'https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg',
    authorAbout: 'hey I am the developer',
    company: 'Firghi Co.'
  },
  {
    id: '2',
    fullName: 'Furkan',
    profileImageUrl: 'https://i.pinimg.com/originals/78/07/03/78070395106fcd1c3e66e3b3810568bb.jpg',
    authorAbout: 'hey I am fake person number 2',
    company: 'Firghi Co.'
  },
  {
    id: '3',
    fullName: 'Rifqi',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/1210715647199580160/G_Ydz6xt.jpg',
    authorAbout: 'hey I am fake person number 3',
    company: 'Firghi Co.'
  }
]


  constructor() { }


  getAuthorById(authorId) {
    let author;
    this.authors.forEach(element => {
      if(element.id === authorId) {
        author = element;
      }
    });
    return author;
  }

}
