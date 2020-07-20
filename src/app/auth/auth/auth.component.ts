import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl} from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from "../auth.service";
import {Author} from '../../author/author.model';
declare const M;
declare const $;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({transform: 'translateY(-100%)', opacity: 0}),
        animate('.4s ease-in', style({transform: 'translateY(0%)', opacity: 1}))
      ]),
      transition(':leave', [
        animate('.4s ease-in', style({transform: 'translateY(100%)', opacity: 0}))
      ])
    ]),
  ]
})
export class AuthComponent implements OnInit, AfterViewInit {
instances: any;
isNewUser: boolean = true;
loginForm: FormGroup;
signupForm: FormGroup;
profileForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    })

    this.profileForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      authorAbout: new FormControl('', [Validators.required]),
      company: new FormControl(''),
      profileImageUrl: new FormControl('')
    })
  }

  ngAfterViewInit(): void {

    this.signupForm.controls.password.valueChanges.subscribe(() => {
      this.signupForm.controls.confirmPassword.updateValueAndValidity();
   });
  }

  async onSignUp() {
    let newAuthor = {
      fullName: this.profileForm.value.fullName,
      profileImageUrl: "",
      authorAbout: this.profileForm.value.authorAbout,
      company: this.profileForm.value.company
    }
    let res = await this.authService.signUp(
       this.signupForm.value.email,
       this.signupForm.value.password,
       newAuthor);
       console.log(res);
    if (res[0] === true) {
      alert(res[1]);
      this.router.navigate(['../']);
    } else {
      alert(res[1]);
    }
  }

  async onLogIn() {
    let res = await this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
    if (res[0] === false) {
      alert("Incorrect email or password!");
    }
  }

  matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}




}
