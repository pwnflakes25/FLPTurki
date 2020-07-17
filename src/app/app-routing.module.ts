import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {  BlogPostComponent } from "./blog/blog-post/blog-post.component";
import {AuthorProfileComponent} from "./author/author-profile/author-profile.component";


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
