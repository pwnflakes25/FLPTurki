import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup , FormControl} from '@angular/forms';
import {CommentService} from '../comment.service';
import {AuthService} from '../../auth/auth.service';
import {AuthorService} from '../../author/author.service';
import {Observable, Subject} from 'rxjs';
import {Comment} from '../comment.model';
import {Author} from '../../author/author.model';
import {concatMap, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
commentForm: FormGroup;
@Input() blogId: string;
// comments$: Observable<Comment[]>;
comments: Comment[];
commenter: Author;
currentUserId: string;
destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private cs: CommentService, private authService: AuthService, private as: AuthorService) { }

  ngOnInit(): void {
   //retreive comments for this specific blog with blog id;
    this.cs.getCommentsByBlogId().subscribe(comments => {
      this.comments = [...comments];
    })
    this.cs.triggerBlogIdQuery(this.blogId);

    //set up the form to add new comment
    this.commentForm = new FormGroup({
      message: new FormControl('')
    })

      //this code below retrieve the current logged in user data to be used for the comment data
     this.authService.getCurrentUser().pipe(concatMap(user => {
       this.currentUserId = user.uid;
       return this.as.getAuthorById(user.uid);
     }), takeUntil(this.destroy$))
     .subscribe(author => {
       this.commenter = author
     });
  }

  onSubmitComment() {
    const comment = {
      message: this.commentForm.value.message,
      blogId: this.blogId,
      likes: 0,
      userLikes: [],
      date: new Date(),
      commenterName: this.commenter.fullName,
      commenterId: this.currentUserId
    }
    this.cs.addComment(comment);
  }

  addLikeToComment(comment) {
    if (comment.userLikes.includes(this.currentUserId)) {
      return;
    } else {
      comment.userLikes.push(this.currentUserId);
      comment.likes += 1;
      this.cs.updateComment(comment.id, comment);
    }
  }

  hasUserLiked(comment: Comment) {
    if (comment.userLikes.includes(this.currentUserId)) {
      return true;
    } else {
      return false;
    }
  }

  onDeleteComment(commentId: string) {
    this.cs.deleteComment(commentId);
  }

  onCopyComment(containerId) {
      if ((<any>document).selection) { //IE
        let range = (<any>document).body.createTextRange();
        range.moveToElementText(document.getElementById(containerId));
        range.select().createTextRange();
        document.execCommand("copy");
     } else if (window.getSelection) { //chrome
        let range: Range = document.createRange();
        range.selectNode(document.getElementById(containerId));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
     }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
