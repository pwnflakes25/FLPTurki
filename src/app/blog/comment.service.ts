import { Injectable } from '@angular/core';
import {Comment} from "./comment.model";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsCollection: AngularFirestoreCollection<Comment>;
  private commentDoc: AngularFirestoreDocument<Comment>;
  blogComments$: Observable<Comment[]>;
  comment$: Observable<Comment>;
  blogId$ = new Subject<string>();

  constructor(private af: AngularFirestore) {
      this.commentsCollection = af.collection<Comment>('comments');
      this.blogComments$ = this.blogId$.pipe(
        switchMap(blogId =>
          af.collection('comments', ref => ref.where('blogId', '==', blogId)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Comment;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          )
        )
      );
   }

   triggerBlogIdQuery(blogId: string) {
      this.blogId$.next(blogId);
   }

  getCommentsByBlogId() {
     return this.blogComments$;
  }

  getCommentById(id: string) {
    this.commentDoc = this.af.doc<Comment>(`comments/${id}`);
    this.comment$ = this.commentDoc.valueChanges();
    return this.comment$;
  }

  addComment(comment: Comment) {
    this.commentsCollection.add(comment);
  }

  deleteComment(commentId: string) {
   this.getCommentById(commentId);
   this.commentDoc.delete();
  }

  updateComment(commentId: string, comment: Comment) {
   this.getCommentById(commentId);
   this.commentDoc.update(comment);
  }


}
