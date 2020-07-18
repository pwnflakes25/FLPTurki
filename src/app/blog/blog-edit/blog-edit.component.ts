import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BlogService } from "../../blog.service";

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

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

  constructor(private bs: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
