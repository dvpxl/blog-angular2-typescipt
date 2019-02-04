import {Component, OnInit} from '@angular/core';
import {enableProdMode} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {PostService} from './post.service';
import {LoginService} from './login.service';
import {LikeService} from './like.service';
import {PostSubmitForm} from './post-submit-form.component';
import {CommentService} from './comment.service';
import {LoginForm} from './login-form.component';
import {LogoutForm} from './logout-form.component';
import {CONFIG} from './config';

// import {HeroesComponent} from './heroes.component';
// import {HeroService} from './hero.service';
// import {HeroDetailComponent} from './hero-detail.component'
// import {DashboardComponent} from './dashboard.component';

import {PostsComponent} from './posts.component';
import {PostDetailsComponent} from './post-details.component';

import {APP_BASE_HREF} from '@angular/common';
import {provide} from '@angular/core';

enableProdMode();
@Component({

	selector: 'my-webapp',
	templateUrl: 'webapp/app.component.html',
	styleUrls:['webapp/app.component.css'],

	//removed HeroesComponent from directive
	//router will be responsible for this.
	directives: [ROUTER_DIRECTIVES, PostsComponent, PostSubmitForm, PostDetailsComponent],
	providers: [PostService, LoginService, CommentService, LikeService, CONFIG, ROUTER_PROVIDERS],
	viewBindings : [LoginService],

})

/** notes for above template
* [routerLink] binding says create "Heroes" when this
* link is clicked.  It will be displayed
* immediately below the <router-outlet> tag 
*/

/**
* @param path of route
* @param name capitalization required for referring to this route path in template
* @param component to be created
*/
@RouteConfig([
  {
    path: '/posts',
    name: 'Posts',
    component: PostsComponent,
    useAsDefault: true
  },

  {
  	path: '/post/submit',
  	name: 'PostSubmitForm',
  	component: PostSubmitForm
  }, 

  {
  	path: '/login',
  	name: 'LoginForm',
  	component: LoginForm
  }, 

  {
    path: '/logout',
    name: 'LogoutForm',
    component: LogoutForm
  }, 

  {
  	path: '/post/:id',
  	name: 'PostDetail',
  	component: PostDetailsComponent
  }
  // {
  // 	path: '/post/new',
  // 	name: 'NewPost',
  // 	component: NewPostComponent,
  // 	useAsDefault: true
  // },
  // {
  // 	path: '/post/:id',
  // 	name: 'PostDetail',
  // 	component: PostDetailComponent,

  // }
])


export class AppComponent {

  title: string = 'FollowIoT (Internet of Things)';
  logoUrl: string = 'https://pbs.twimg.com/profile_images/646492935337349120/rudTQnSI_bigger.png';
  loggedIn: boolean = false;

  constructor(

  	 private _loginService: LoginService

  ){ }

  ngOnInit() {

  	  this.isLoggedIn();
  	  this.subscriptions();

  }

  isLoggedIn() {

  	  let jwt: string = localStorage.getItem('jwt');
  	  let userId: string = localStorage.getItem('userId');

  	  if(jwt === null || userId === null) {
  	  	 return false;
  	  }

  	  this._loginService.loggedIn(jwt, userId)
  	  				.subscribe(
  	  					data => {this.loggedIn = data.result; console.log("loggedIn:", data.result);},
  	  					error => {this.errorMessage = <any> error},
  	  					() => {}
  	  				 )
  }

  logoutClicked(event) {
  	 event.preventDefault();
  	 //this.loggedIn = !this.loggedIn;

  	 this._loginService.logout()
	  	 .subscribe(
	  	  	   data => {this.onLogoutClickedSuccess(data)},
	  	  	   error => {this.onLogoutClickError(err)}
	  	  )
  }

  onLogoutClickedSuccess(data) {
  	 //todo: remove localStorage
  	 this._loginService.logoutEvent.emit("Logged Out");
  }

  onLogoutClickError(err) {
  	 this.errorMessage = err;
  }

  subscriptions() {

  	let loginEvent = this._loginService.loginEvent.subscribe((value) => { 
    		console.log("Got Dispatch Value:", value);
    		this.loggedIn = true;
  	});

  	let logoutEvent = this._loginService.logoutEvent.subscribe((value) => { 
    		console.log("Got Dispatch Value:", value);
    		this.loggedIn = false;
  	});

  }

  
 

}
