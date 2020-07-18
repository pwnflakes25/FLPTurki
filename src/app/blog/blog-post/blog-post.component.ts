import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from "../../blog.service";
import { AuthorService } from "../../author/author.service";
import {Blog} from '../blog.model';
import {Author} from '../../author/author.model';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
blog: Blog;
author: Author;


  constructor(private route: ActivatedRoute, private bs: BlogService, private as: AuthorService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    this.blog = this.bs.getBlogById(id);
    this.author = this.as.getAuthorById(this.blog.authorId);
   });
  }




}
