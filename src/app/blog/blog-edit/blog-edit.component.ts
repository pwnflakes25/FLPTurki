import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { BlogService } from "../../blog.service";
import {AuthService} from '../../auth/auth.service';
import {Blog} from '../blog.model';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
declare const M;

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit, AfterViewInit {
blog$: Observable<Blog>;
currentBlogId: string;
defaultImgUrl: string = "https://atlantictravelsusa.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg";
private currentUser;
blogForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    summary: new FormControl(''),
    imageUrl: new FormControl(''),
    authorId: new FormControl(''),
    date: new FormControl(''),
    tags: new FormControl('')
});
edit: boolean = false;
options: Object = {
  placeholderText: 'Write your content',
  charCounterCount: true,
  attribution: false,
  paragraphStyles: {
   class1: 'contentText',
   class2: 'Class 2'
 }
}
selectInstance: any;
selectedValues: any;


  constructor(private bs: BlogService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    let edit = params['edit'];

      if (edit) {
       this.fetchBlogAndFillForm(id);
     }

      this.authService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
      })

    });
  }

  ngAfterViewInit(): void {
    let selectElems = document.querySelectorAll('select');
    this.selectInstance = M.FormSelect.init(selectElems);
  }

  async fetchBlogAndFillForm(id) {
    this.blog$ = await this.bs.getBlogById(id);
    this.blog$.subscribe((blog:any) => {
      this.currentBlogId = blog.id;
      this.setFormValue(blog.data);
    })
  }

 //set form value if the blog is exisiting and it is editing
  async setFormValue(blog: Blog) {
    this.blogForm.setValue({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      summary: blog.summary,
      imageUrl: blog.imageUrl,
      authorId: blog.authorId,
      date: blog.date,
      tags: blog.tags,
      isPublished: blog.isPublished,
      likes: blog.likes
    })
  }

  async onPublishBlog() {
    if (this.blogForm.value.imageUrl === "") {
      this.blogForm.patchValue({
        imageUrl: this.defaultImgUrl
      })
    }
    this.blogForm.patchValue({
      authorId: this.currentUser.uid,
      date: new Date(),
      isPublished: true,
      likes: 0,
      tags: this.blogForm.value.tags
    })
    console.log()
    try {
      this.bs.addBlog(this.blogForm.value);
      alert("Success!");
      this.router.navigate(['/'])
    } catch (error) {
      alert(error);
    }

    console.log(this.blogForm.value);

  }


  //basically same like update or post but publish is false
  onSaveBlog() {
    //if it is on edit, and user click save, we want it to not be published anymore
    if (this.edit) {
      this.blogForm.patchValue({
        authorId: this.currentUser.uid,
        date: new Date(),
        isPublished: false
      })
     this.bs.updateBlog(this.currentBlogId, this.blogForm.value);
    }
    // if it is not edit, then add like usual but isPublished is false
    else {
      this.blogForm.patchValue({
        authorId: this.currentUser.uid,
        date: new Date(),
        isPublished: false,
        likes: 0,
        tags: this.blogForm.value.tags
      })
     this.bs.addBlog(this.blogForm.value);
    }
  }

  onUpdateBlog() {
    this.blogForm.patchValue({
      date: new Date()
    })
    this.bs.updateBlog(this.currentBlogId, this.blogForm.value);
  }

}
