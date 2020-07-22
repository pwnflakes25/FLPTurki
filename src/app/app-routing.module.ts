import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {  BlogPostComponent } from "./blog/blog-post/blog-post.component";
import {AuthorProfileComponent} from "./author/author-profile/author-profile.component";
import { BlogEditComponent } from "./blog/blog-edit/blog-edit.component";
import {AuthComponent} from './auth/auth/auth.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/signin']);


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'blog',
    component: BlogPostComponent
  },
  {
    path: 'author',
    component: AuthorProfileComponent
  },
  {
    path: 'create',
    component: BlogEditComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'auth/:intent',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
