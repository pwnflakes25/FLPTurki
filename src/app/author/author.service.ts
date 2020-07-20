import { Injectable } from '@angular/core';
import {Author} from './author.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  authorsCollection: AngularFirestoreCollection<Author>;
  authorDoc: AngularFirestoreDocument<Author>;
  $authors: Observable<Author[]>;
  $author: Observable<Author>;



  constructor(private af: AngularFirestore) {
   this.authorsCollection = this.af.collection<Author>('authors');
   this.$authors = this.authorsCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Author;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }


  getAuthorById(id: string) {
    this.authorDoc = this.af.doc<Author>(`authors/${id}`);
    this.$author = this.authorDoc.valueChanges();
    return this.$author;
  }

  createAuthor(id: string, data: Author) {
    this.authorsCollection = this.af.collection<Author>('authors');
    this.authorsCollection.doc(id).set(data);
  }

  updateAuthorProfile(id: string, author: Author) {
    this.authorDoc = this.af.doc<Author>(`authors/${id}`);
    this.$author = this.authorDoc.valueChanges();
    this.authorDoc.update(author);
  }

}
