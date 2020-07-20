import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Blog} from '../blog/blog.model';
import { BlogService } from "../blog.service";
import {Observable} from 'rxjs';
declare const M;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
blogs: Observable<Blog[]>;

  constructor(private bs: BlogService) { }

  ngOnInit(): void {
    this.blogs = this.bs.getBlogs();
  }

  ngAfterViewInit(): void {
    let elems = document.querySelectorAll('.fixed-action-btn');
    let instances = M.FloatingActionButton.init(elems);
  }

}
