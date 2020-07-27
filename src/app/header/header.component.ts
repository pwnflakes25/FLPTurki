import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { Router, ActivatedRoute, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";
import {Subscription} from 'rxjs';
declare const M;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
isAuth = false;
private user;
userSub: Subscription;
isOnBlog:boolean = false;

  constructor(public authService: AuthService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
  }

  goToProfile() {
    this.router.navigate(['/author'], { queryParams: {id: this.user.uid}});
  }


  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['/auth/signin']);
  }


  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }


}
