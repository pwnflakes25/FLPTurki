import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from "../../blog.service";
import { AuthorService } from "../../author/author.service";
import {Blog} from '../blog.model';
import {Author} from '../../author/author.model';
import {Subscription,Observable} from 'rxjs';
import {map, concatMap} from 'rxjs/operators';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
blog: Blog;
currentBlogId: string;
author: Author;


  constructor(private route: ActivatedRoute, private bs: BlogService, private as: AuthorService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    this.fetchBlogAndAuthorDetails(id);
   });
  }


  fetchBlogAndAuthorDetails(id) {
     this.bs.getBlogById(id).pipe(concatMap(blog => {
       return this.as.getAuthorById(blog.authorId).pipe(map(res => {
          this.blog = blog;
          this.author = res;
      }))
    }))
  }




}
