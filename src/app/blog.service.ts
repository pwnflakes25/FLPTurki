import { Injectable } from '@angular/core';
import {Blog} from './blog/blog.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsCollection: AngularFirestoreCollection<Blog>;
  private blogDoc: AngularFirestoreDocument<Blog>;
  $blogs: Observable<Blog[]>;
  $blog: Observable<Blog>;
  $authorBlogs: Observable<Blog[]>;
  $authorId = new Subject<string>();


  constructor(private af: AngularFirestore) {
    this.blogsCollection = af.collection<Blog>('blogs');
    this.$authorBlogs = this.$authorId.pipe(
      switchMap(authorId =>
        af.collection('blogs', ref => ref.where('authorId', '==', authorId)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        )
      )
    );
  }

  getBlogs() {
    this.$blogs = this.blogsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Blog;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.$blogs;
  }

  getBlogById(id: string) {
    this.blogDoc = this.af.doc<Blog>(`blogs/${id}`);
    this.$blog = this.blogDoc.valueChanges();
    return this.$blog;
  }

  triggerAuthorIdQuery(authorId: string) {
     this.$authorId.next(authorId);
  }

  getBlogsByAuthorId() {
    return this.$authorBlogs;
  }

  addBlog(blog: Blog) {
    this.blogsCollection.add(blog);
  }

  updateBlog(id: string, blog: Blog) {
    this.blogDoc = this.af.doc<Blog>(`blogs/${id}`);
    this.$blog = this.blogDoc.valueChanges();
    this.blogDoc.update(blog);
  }

  addLikeToBlog(id: string) {
    this.blogDoc = this.af.doc<Blog>(`blogs/${id}`);
    this.blogDoc.valueChanges().pipe(take(1)).subscribe(blog => {
       blog.likes += 1;
       this.updateBlog(id, blog);
    })
  }

  minusLikeToBlog(id: string) {
    this.blogDoc = this.af.doc<Blog>(`blogs/${id}`);
    this.blogDoc.valueChanges().pipe(take(1)).subscribe(blog => {
       blog.likes -= 1;
       this.updateBlog(id, blog);
    })
  }

}
