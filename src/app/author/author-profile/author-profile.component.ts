import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BlogService } from "../../blog.service";
import { AuthorService } from "../author.service";
import { Blog } from "../../blog/blog.model";
import { Author } from "../author.model";
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.scss']
})
export class AuthorProfileComponent implements OnInit, AfterViewInit {
blogs$: Observable<Blog[]>;
blogs: Blog[];
author$: Observable<Author>;
defaultProfilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

  constructor(private bs: BlogService, private as: AuthorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    this.bs.getBlogsByAuthorId().subscribe(res => {
      this.blogs = res;
    });
    this.author$ = this.as.getAuthorById(id);
    this.bs.triggerAuthorIdQuery(id);
   });
  }

  ngAfterViewInit(): void {
  }

}
