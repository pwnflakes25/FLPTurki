import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';

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
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';
import { SortAndLimitPipePipe } from './homepage/sort-and-limit-pipe.pipe';
import { GenrePipePipe } from './homepage/genre-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BlogPostComponent,
    AuthorProfileComponent,
    BlogEditComponent,
    HeaderComponent,
    AuthComponent,
    SortAndLimitPipePipe,
    GenrePipePipe
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
    AngularEditorModule,
    HttpClientModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [BlogService, AuthorService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
