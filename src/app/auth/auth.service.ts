import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {AuthorService}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private as: AuthorService) { }


  signUp(email, password, fullName, profileImage, about, company) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
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
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // .
    }
  }

}
