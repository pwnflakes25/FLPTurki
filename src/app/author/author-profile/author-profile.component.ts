import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { BlogService } from "../../blog.service";
import { AuthorService } from "../author.service";
import {AuthService} from '../../auth/auth.service';
import { Blog } from "../../blog/blog.model";
import { Author } from "../author.model";
import { ActivatedRoute } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.scss']
})
export class AuthorProfileComponent implements OnInit, AfterViewInit, OnDestroy{
blogs$: Observable<Blog[]>;
blogs: Blog[];
author$: Observable<Author>;
currentUserId: string;
userSub: Subscription;
urlAuthorId: string;
isLoading = true;
isEdit = false;
accountForm: FormGroup;
settingOption: string;
profileDisplay: string | ArrayBuffer = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
authorSub: Subscription;

  constructor(private bs: BlogService, private as: AuthorService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    let id = params['id'];
    this.urlAuthorId = id;
    this.bs.getBlogsByAuthorId().subscribe((res) => {
      this.blogs = res;
      this.isLoading = false;
    });
    this.author$ = this.as.getAuthorById(id);
    this.bs.triggerAuthorIdQuery(id);
   });
    this.userSub = this.authService.getCurrentUser().subscribe(user => {
     this.currentUserId = user.uid;
   })
  }

  ngAfterViewInit(): void {
    this.authorSub = this.author$.subscribe(author => {
      if (author.profileImageUrl !== '') {
        this.profileDisplay = author.profileImageUrl;
      }
    })
  }


  patchAccountForm(author: Author) {
    this.accountForm = new FormGroup({
      fullName: new FormControl(author.fullName, [Validators.required]),
      email: new FormControl(author.email, [Validators.required]),
      profileImageUrl: new FormControl(author.profileImageUrl, [Validators.required]),
      authorAbout: new FormControl(author.authorAbout, [Validators.required]),
      company: new FormControl(author.company, [Validators.required])
    })
  }

  onProfileImageSelect(e) {
    const fileSize = e.target.files[0].size/1024/1024;
    if (fileSize > 1.048487) {
      const width = 180;
      const height = 180;
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
              this.accountForm.patchValue({profileImageUrl: data});
              this.accountForm.get('profileImageUrl').updateValueAndValidity();
              this.profileDisplay = event.target.result;
       }
     }
   } else {
     const file = (e.target as HTMLInputElement).files[0];
     const reader = new FileReader();
     reader.onload = () => {
       this.profileDisplay = reader.result;
       this.accountForm.patchValue({profileImageUrl: reader.result});
       this.accountForm.get('profileImageUrl').updateValueAndValidity();
     };
     reader.readAsDataURL(file);
   }
  }

  onDelete(authorId: string, blogId: string) {
    if (authorId == this.currentUserId) {
      try {
        this.bs.deleteBlog(blogId);
        alert('Deleted Sucessfully');
      } catch (error) {
        alert(error);
      }
    }
  }

  onSave() {
    try {
      this.as.updateAuthorProfile(this.currentUserId, this.accountForm.value);
      alert('Change Saved');
      this.isEdit = false;
    } catch (error) {
      alert(error);
    }

  }

  ngOnDestroy(): void {
   if (this.userSub) {
     this.userSub.unsubscribe();
   }

   if(this.authorSub) {
     this.authorSub.unsubscribe();
   }
  }

}
