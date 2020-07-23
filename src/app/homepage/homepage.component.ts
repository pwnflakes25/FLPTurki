import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Blog} from '../blog/blog.model';
import { BlogService } from "../blog.service";
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
declare const M;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
blogs: Observable<any>;
showFirst: boolean = false;

  constructor(private bs: BlogService, public authService: AuthService) { }

  ngOnInit(): void {
    this.blogs = this.bs.getBlogs();
  }

  ngAfterViewInit(): void {
    let elems = document.querySelectorAll('.fixed-action-btn');
    let instances = M.FloatingActionButton.init(elems);
  }

  addLikes(id: string) {
    this.bs.addLikeToBlog(id);
  }

  minusLikes(id: string) {
    this.bs.minusLikeToBlog(id);
  }

}
