import { Injectable } from '@angular/core';
import {Author} from './author.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authorsCollection: AngularFirestoreCollection<Author>;
  private authorDoc: AngularFirestoreDocument<Author>;
  $authors: Observable<Author[]>;
  $author: Observable<Author>;


authors: Author[] = [
  {
    id: '1',
    fullName: 'Firghi',
    profileImageUrl: 'https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg',
    email: 'firghi@firghico.com',
    authorAbout: 'hey I am the developer',
    company: 'Firghi Co.'
  },
  {
    id: '2',
    fullName: 'Furkan',
    profileImageUrl: 'https://i.pinimg.com/originals/78/07/03/78070395106fcd1c3e66e3b3810568bb.jpg',
    email: 'furkan@firghico.com',
    authorAbout: 'hey I am fake person number 2',
    company: 'Firghi Co.'
  },
  {
    id: '3',
    fullName: 'Rifqi',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/1210715647199580160/G_Ydz6xt.jpg',
    email: 'rifqi@firghico.com',
    authorAbout: 'hey I am fake person number 3',
    company: 'Firghi Co.'
  }
]


  constructor(private af: AngularFirestore) {
   this.authorsCollection = af.collection<Author>('authors');
   this.$authors = this.authorsCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Author;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }


  getAuthorById(authorId) {
    //to change to authors
    let author;
    this.authors.forEach(element => {
      if(element.id === authorId) {
        author = element;
      }
    });
    return author;
  }

  getAuthorByUid(id: string) {
    this.authorDoc = this.af.doc<Author>(`authors/${id}`);
    this.$author = this.authorDoc.valueChanges();
    return this.$author;
  }

  createAuthor(id: string, data: Author) {
    this.authorsCollection.doc(id).set(data);
  }

  updateAuthorProfile(id: string, author: Author) {
    this.authorDoc = this.af.doc<Author>(`authors/${id}`);
    this.$author = this.authorDoc.valueChanges();
    this.authorDoc.update(author);
  }

}
