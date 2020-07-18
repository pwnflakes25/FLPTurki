import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { AuthorProfileComponent } from './author/author-profile/author-profile.component';
import { BlogService } from "./blog.service";
import { AuthComponent } from './auth/auth/auth.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BlogPostComponent,
    AuthorProfileComponent,
    AuthComponent,
    BlogEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    ReactiveFormsModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
