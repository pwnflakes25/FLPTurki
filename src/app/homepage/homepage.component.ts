import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import {Blog} from '../blog/blog.model';
import { BlogService } from "../blog.service";
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
declare const M;
declare const Swiper;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
blogs: Observable<any>;
showFirst: boolean = false;
currentUserId: string;
userSub: Subscription;
blogSub: Subscription;

  constructor(private bs: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.blogs = this.bs.getBlogs();
    this.userSub = this.authService.getCurrentUser().subscribe(user => {
      this.currentUserId = user.uid;
    })
  }

  ngAfterViewInit(): void {
    let elems = document.querySelectorAll('.fixed-action-btn');
    let instances = M.FloatingActionButton.init(elems);
    //below make FAB background to blue on scroll and make it transparent again after done
      let swiper = new Swiper('.swiper-container', {
       slidesPerView: 'auto',
       spaceBetween: 20,
       scrollbar: {
          el: '.swiper-scrollbar',
          hide: true,
        }
      })

    var timer = null;
      window.addEventListener('scroll', () => {
          if(timer !== null) {
            document.getElementById('fab').classList.add('secondary-background');
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            document.getElementById('fab').classList.remove('secondary-background');
          }, 1000);
      }, false);
  }

  addLikes(blog: any) {
      blog.userLikes.push(this.currentUserId);
      blog.likes += 1;
      this.bs.updateBlog(blog.id, blog);
  }

  minusLikes(blog: any) {
      blog.likes -= 1;
      //below finds the user id in the array userLikes of the edited blog
      let index = blog.userLikes.indexOf(this.currentUserId);
        if (index > -1) {
           blog.userLikes.splice(index, 1);
         }
      this.bs.updateBlog(blog.id, blog);
  }

  checkIfCurrentUserLiked(blog: any) {
    return blog.userLikes.includes(this.currentUserId);
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.blogSub) {
      this.blogSub.unsubscribe();
    }
  }

}
