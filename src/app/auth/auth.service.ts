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

async signUp(email, password, fullName, profileImage, about, company) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        .then((user: any) => {
          // get user data from the auth trigger
          const userUid = user.uid; // The UID of the user.
          // set account  doc
          const author: Author = {
            id: userUid,
            email: email,
            fullName: fullName,
            profileImageUrl: profileImage,
            authorAbout: about,
            company: company
          }
          this.as.createAuthor(userUid, author);
        })
        .catch(function(error) {
         var errorCode = error.code;
         var errorMessage = error.message;
      });
  }

  signIn(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      return error;
    });
  }



}
