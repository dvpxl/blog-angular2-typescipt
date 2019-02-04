import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from '@angular/common';

import {LoginService} from './login.service';
import {User} from './user';
import {CONFIG} from './config';

@Component({
	selector: "login-form",
	templateUrl: 'webapp/login-form.component.html',
  styleUrls: ['webapp/login-form.component.css'],

})

export class LoginForm {
  loginForm: ControlGroup;
  createAccountForm: ControlGroup;
  inProgressLogin: string = false;

  constructor(
  	 private _formBuilder: FormBuilder,
     private _router: Router,
  	 private _loginService: LoginService,
  	 private _CONFIG: CONFIG
  	 
  ) { }

  ngOnInit() {
  	  this.initFormBuilder();
  }
  
  initFormBuilder() {
  	this.loginForm = this._formBuilder.group({
	        'email': ['', Validators.required],
	        'password': ['', Validators.required],
	  });

	  this.createAccountForm = this._formBuilder.group({
	        'email': ['', Validators.required],
	        'password': ['', Validators.required],
          'username': ['', Validators.required],
	  });
  }

  onLogin(event) {
  	  event.preventDefault();
      this.inProgressLogin = true;
  	  console.log(this._CONFIG.getApiUrl());
  	  console.log("Login Submitted with value: " + this.loginForm.value)
  	  this._loginService.login(this.loginForm.value).subscribe(
  	  		data => {

  	  			console.log("Got Data1:", data);
  	  			this.onLoginComplete(data)

  	  		},
  	  		error => {this.onLoginError(error)}, 
  	  );
  }

  onCreateAccount(event) {
  	  event.preventDefault();
  	  console.log("CreateLogin form Submitted with value: " + this.createAccountForm.value)
  	  this._loginService.createAccount(this.createAccountForm.value).subscribe(
  	  	   data => {this.onCreateAccountComplete(data)},
  	  	   error => {this.onCreateAccountError(error)}
  	  )
  }

  onLoginComplete(data) {
  	this.user = data;
  	console.log("Got Data:", data);
  	localStorage.setItem("jwt", data.id);
  	localStorage.setItem("userId", data.userId);

    this._loginService.loginEvent.emit(this.user);
    this._router.parent.navigate(['Posts']);

  }

  onLoginError(err: any) {
     this.errorMessageLogin = JSON.parse(err._body);
     this.inProgressLogin = false;

  }

  onCreateAccountComplete(data) {
     this.user = data;
     this.successMessageCreateAccount = "Awesome!  Please login above with your new account"
  }

  onCreateAccountError(err: any) {
     this.errorMessageCreateAccount = JSON.parse(err._body);
  }

  //method will check if the username is available during account creation
  checkUsernameAvailable(event) {
     console.log("checking if username available:", this.createAccountForm.value.username);
     this._loginService.checkUsernameAvailable(this.createAccountForm.value.username).subscribe(
         data => {console.log("Username available?", data);},
         error => {console.log("Error checking username", error);}
     )
  }

  usernameAvailable() {
     return true;
  }
}