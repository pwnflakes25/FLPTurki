import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { BlogService } from "../../blog.service";
import {AuthService} from '../../auth/auth.service';
import {Blog} from '../blog.model';
declare const M;

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit, AfterViewInit {
blog: Blog;
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

  constructor(private bs: BlogService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    let edit = params['edit'];

      if (edit) {
       this.setFormValue(id);
      }

    });
  }

  ngAfterViewInit(): void {
    let selectElems = document.querySelectorAll('select');
    let selectInstances = M.FormSelect.init(selectElems);
  }

  async setFormValue(id: string) {
    this.blog = await this.bs.getBlogById(id);
    this.blogForm.setValue({
      title: this.blog.title,
      description: this.blog.description,
      content: this.blog.content,
      summary: this.blog.summary,
      imageUrl: this.blog.imageUrl,
      authorId: this.blog.authorId,
      date: this.blog.date,
      tags: this.blog.tags
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
    this.bs.updateBlog(this.blog.blogId, this.blogForm.value);
  }

}
