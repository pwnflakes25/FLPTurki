import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { BlogService } from "../../blog.service";
import {AuthService} from '../../auth/auth.service';
import {Blog} from '../blog.model';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {genres} from './genres';
declare const M;

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit, AfterViewInit {
blog$: Observable<Blog>;
currentBlogId: string;
referencesList: string[] = [];
imageDisplayUrl: string | ArrayBuffer = '';
defaultImgUrl: string = "https://atlantictravelsusa.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg";
private currentUser;
blogForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    summary: new FormControl(''),
    imageUrl: new FormControl(''),
    isPublished: new FormControl(''),
    authorId: new FormControl(''),
    date: new FormControl(''),
    tags: new FormControl(''),
    likes: new FormControl(''),
    genres: new FormControl(''),
    references: new FormControl('')
});
edit: boolean = false;
options: Object = {
  placeholderText: 'Write your content here...',
  charCounterCount: true,
  attribution: false,
  htmlAllowedStyleProps: ['font-family', 'font-size', 'background', 'color', 'width', 'text-align', 'vertical-align', 'background-color'],
  editorClass: 'editorStyle'
}
selectInstance: any;
selectedValues: any;
genres = genres;


  constructor(private bs: BlogService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    let edit = params['edit'];
    this.currentBlogId = id;

      if (edit) {
       this.edit = true;
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
      this.setFormValue(blog);
    })
  }

 //set form value if the blog is exisiting and it is editing
  setFormValue(blog: Blog) {
    this.referencesList = [...blog.references];
    this.imageDisplayUrl = blog.imageUrl;
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
      likes: blog.likes,
      genres: blog.genres,
      references: blog.references
    })
  }

  addReference(value: string) {
    console.log(value);
    this.referencesList.push(value);
    const elem = (<HTMLInputElement>document.getElementById('referenceInput'));
    elem.value = "";
  }

  removeReference(i: number) {
    this.referencesList.splice(i,1);
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
      tags: this.blogForm.value.tags,
      references: [...this.referencesList]
    })
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
        isPublished: false,
        references: this.referencesList
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
        tags: this.blogForm.value.tags,
        references: this.referencesList.slice()
      })
     this.bs.addBlog(this.blogForm.value);
    }
  }

  onUpdateBlog() {
    this.blogForm.patchValue({
      date: new Date(),
      references: [...this.referencesList]
    })
    try {
      this.bs.updateBlog(this.currentBlogId, this.blogForm.value);
      alert("Success!");
      this.router.navigate(['/'])
    } catch (error) {
      alert(error);
    }
  }


  // onFileSelected(event: Event) {
  //   //this shit below helps display image uploaded
  //   const file = (event.target as HTMLInputElement).files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageDisplayUrl = reader.result;
  //     this.blogForm.patchValue({imageUrl: reader.result});
  //     this.blogForm.get('imageUrl').updateValueAndValidity();
  //   };
  //   reader.readAsDataURL(file);
  // }

  onFileSelected(e) {
    const fileSize = e.target.files[0].size/1024/1024;
    if (fileSize > 1.048487) {
      const width = 700;
      const height = 266;
      let data;
      const fileName = e.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result as string;
          img.onload = () => {
                  const elem = document.createElement('canvas');
                  elem.width = width;
                  elem.height = height;
                  const ctx = elem.getContext('2d');
                  // img.width and img.height will contain the original dimensions
                  ctx.drawImage(img, 0, 0, width, height);
                  data = ctx.canvas.toDataURL('image/png', 1);
              reader.onerror = error => console.log(error);
              this.blogForm.patchValue({imageUrl: data});
              this.blogForm.get('imageUrl').updateValueAndValidity();
              this.imageDisplayUrl = event.target.result;
       }
     }
   } else {
       const file = (e.target as HTMLInputElement).files[0];
       const reader = new FileReader();
       reader.onload = () => {
         this.imageDisplayUrl = reader.result;
         this.blogForm.patchValue({imageUrl: reader.result});
         this.blogForm.get('imageUrl').updateValueAndValidity();
       };
       reader.readAsDataURL(file);
   }

 }

}
