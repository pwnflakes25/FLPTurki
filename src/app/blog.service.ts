import { Injectable } from '@angular/core';
import {Blog} from './blog/blog.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsCollection: AngularFirestoreCollection<Blog>;
  private blogDoc: AngularFirestoreDocument<Blog>;
  $blogs: Observable<Blog[]>;
  $blog: Observable<Blog>;

  blogs: Blog[] = [
   {
     title: 'A Blog Post Number 1',
     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
     description: 'Here are some simple description of Blog',
     imageUrl: "https://papers.co/wallpaper/papers.co-bb08-minimal-drawing-pink-illustration-art-34-iphone6-plus-wallpaper.jpg",
     blogId: '12345',
     date: new Date(1594771200 * 1000),
     tags: ['healthy', 'good living'],
     authorId: '1'
   },
   {
     title: 'A Blog Post Number 2',
     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
     description: 'Here are some simple description of Blog',
     imageUrl: "https://papers.co/wallpaper/papers.co-bb08-minimal-drawing-pink-illustration-art-34-iphone6-plus-wallpaper.jpg",
     blogId: '54321',
     date: new Date(1594771200 * 1000),
     tags: ['healthy', 'good living'],
     authorId:'2'
   },
   {
     title: 'A Blog Post Number 3',
     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
     description: 'Here are some simple description of Blog',
     imageUrl: "https://papers.co/wallpaper/papers.co-bb08-minimal-drawing-pink-illustration-art-34-iphone6-plus-wallpaper.jpg",
     blogId: '23321',
     date: new Date(1594771200 * 1000),
     tags: ['healthy', 'good living'],
     authorId: '3'
   },
   {
     title: 'A Blog Post Number 4',
     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
     description: 'Here are some simple description of Blog',
     imageUrl: "https://papers.co/wallpaper/papers.co-bb08-minimal-drawing-pink-illustration-art-34-iphone6-plus-wallpaper.jpg",
     blogId: '123523',
     date: new Date(1594771200 * 1000),
     tags: ['healthy', 'good living'],
     authorId: '1'
   },
  ]

  constructor(private af: AngularFirestore) {
    this.blogsCollection = af.collection<Blog>('blogs');
    this.$blogs = this.blogsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Blog;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getBlogs() {
    //to change to $blogs
    return [...this.blogs];
  }

  getBlogById(id: string) {
   //to be changed for database utilization
   //find a blog with same id as the argument one
    let blog;
    this.blogs.forEach(element => {
      if(element.blogId === id) {
        blog = element;
      }
    });
    return blog;
  }

  getBlogsByAuthorId(authorId: string) {
    //below is to find a blog belonging to specific user
    let userBlog: Blog[] = [];
    this.blogs.forEach(element => {
      if(element.authorId === authorId) {
        userBlog.push(element);
      }
    });
    return userBlog;
  }

  addBlog(blog: Blog) {
    this.blogsCollection.add(blog);
  }

  updateBlog(id: string, blog: Blog) {
    this.blogDoc = this.af.doc<Blog>(`blogs/${id}`);
    this.$blog = this.blogDoc.valueChanges();
    this.blogDoc.update(blog);
  }

}
