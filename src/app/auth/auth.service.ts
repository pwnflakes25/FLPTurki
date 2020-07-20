import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Author} from '../author/author.model';
import {AuthorService} from '../author/author.service';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
$user: Observer<any>;

  constructor(private auth: AngularFireAuth, private as: AuthorService) {
    this.auth.onAuthStateChanged((user: any) =>  {
      if (user) {
        this.$user = user;
      } else {
        this.$user = null;
      }
    })

  }


  getCurrentUser() {
    return this.$user;
  }

async signUp(email, password, newAuthor) {
    let result = await this.auth.createUserWithEmailAndPassword(email, password)
        .then((user: any) => {
          console.log(user.user.uid);
          const userUid = user.user.uid;
          const author: Author = {
            email: email,
            fullName: newAuthor.fullName,
            profileImageUrl: newAuthor.profileImageUrl,
            authorAbout: newAuthor.authorAbout,
            company: newAuthor.company
          }
          this.as.createAuthor(userUid, author);
          return [true, "Signed Up Successfully"];
        })
        .catch(function(error) {
         var errorCode = error.code;
         var errorMessage = error.message;
         return [false, errorMessage];
      });
      return result;
  }

async signIn(email, password) {
  let result =  await this.auth.signInWithEmailAndPassword(email, password)
       .then( cred => {
         return [true, "Logged In Successfully"];
       })
       .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        return [false, errorMessage];
      });

    return result;
  }



}
