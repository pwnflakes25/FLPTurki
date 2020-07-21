import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { AuthorProfileComponent } from './author/author-profile/author-profile.component';
import { BlogService } from "./blog.service";
import {AuthorService} from "./author/author.service";
import {AuthService} from "./auth/auth.service";
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BlogPostComponent,
    AuthorProfileComponent,
    BlogEditComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    ReactiveFormsModule,
    MatStepperModule,
    FroalaEditorModule,
    FroalaViewModule,
    FormsModule
  ],
  providers: [BlogService, AuthorService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
