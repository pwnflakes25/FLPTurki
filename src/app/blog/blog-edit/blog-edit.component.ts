import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { BlogService } from "../../blog.service";
import {AuthService} from '../../auth/auth.service';
import {Blog} from '../blog.model';
import {Observable} from 'rxjs';
declare const M;

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit, AfterViewInit {
blog$: Observable<Blog>;
currentBlogId: string;
blogForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    summary: new FormControl(''),
    imageUrl: new FormControl(''),
    authorId: new FormControl(''),
    date: new FormControl(''),
    tags: new FormArray([
      new FormControl('')
    ])
});
edit: boolean = false;
options: Object = {
  placeholderText: 'Write your content',
  charCounterCount: true,
  attribution: false
}

  constructor(private bs: BlogService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    let edit = params['edit'];

      if (edit) {
       this.fetchBlogAndFillForm(id);
      }

    });
  }

  ngAfterViewInit(): void {
    let selectElems = document.querySelectorAll('select');
    let selectInstances = M.FormSelect.init(selectElems);
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
      tags: blog.tags
    })
  }

  async onPostBlog() {
    let user: any = await this.authService.getCurrentUser();
    this.blogForm.patchValue({
      authorId: user.id,
      date: new Date()
    })
    this.bs.addBlog(this.blogForm.value);
  }

  onUpdateBlog() {
    this.bs.updateBlog(this.currentBlogId, this.blogForm.value);
  }

}
