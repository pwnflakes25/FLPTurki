import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../blog.service";
import { AuthorService } from "../author.service";
import { Blog } from "../../blog/blog.model";
import { Author } from "../author.model";
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.scss']
})
export class AuthorProfileComponent implements OnInit {
blogs$: Observable<Blog[]>;
author$: Observable<Author>;

  constructor(private bs: BlogService, private as: AuthorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    this.blogs$ = this.bs.getBlogsByAuthorId(id);
    this.author$ = this.as.getAuthorById(id);
   });
  }

}
