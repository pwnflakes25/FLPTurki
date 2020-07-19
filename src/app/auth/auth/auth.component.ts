import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
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

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngAfterViewInit(): void {

  }




}
