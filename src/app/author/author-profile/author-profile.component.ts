import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { BlogService } from "../../blog.service";
import { AuthorService } from "../author.service";
import {AuthService} from '../../auth/auth.service';
import { Blog } from "../../blog/blog.model";
import { Author } from "../author.model";
import { ActivatedRoute } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { filter, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.scss']
})
export class AuthorProfileComponent implements OnInit, AfterViewInit, OnDestroy{
blogs$: Observable<Blog[]>;
blogs: Blog[];
author$: Observable<Author>;
currentUserId: string;
userSub: Subscription;
isLoading = true;
defaultProfilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

  constructor(private bs: BlogService, private as: AuthorService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    this.bs.getBlogsByAuthorId().subscribe((res) => {
      this.blogs = res;
      this.isLoading = false;
    });
    this.author$ = this.as.getAuthorById(id);
    this.bs.triggerAuthorIdQuery(id);
   });
    this.userSub = this.authService.getCurrentUser().subscribe(user => {
     this.currentUserId = user.uid;
   })
  }

  ngAfterViewInit(): void {

  }

  onDelete(authorId: string, blogId: string) {
    if (authorId == this.currentUserId) {
      try {
        this.bs.deleteBlog(blogId);
        alert('Deleted Sucessfully');
      } catch (error) {
        alert(error);
      }
    }
  }

  ngOnDestroy(): void {
   if (this.userSub) {
     this.userSub.unsubscribe();
   }
  }

}
