import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { AuthorProfileComponent } from './author/author-profile/author-profile.component';
import { BlogService } from "./blog.service";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BlogPostComponent,
    AuthorProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
