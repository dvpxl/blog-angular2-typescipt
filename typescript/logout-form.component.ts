import {Component, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {LoginService} from './login.service';

@Component({
  selector: 'logout-form',
  template: '<h3>empty</h3>'
})

export class LogoutForm { 
   constructor(
      private _loginService: LoginService,
      private _router: Router

    ) { }

   ngOnInit() {
      console.log('init');
      let authSessionToken = {
        accessToken: localStorage.getItem('jwt'),
        userId: localStorage.getItem('userId')
      };

      this._loginService.logout(authSessionToken)
          .subscribe(
            data => this.onLogoutComplete(),
            error => this.onLogoutError(),
            () => this.onLogoutCleanup())
   }

   onLogoutComplete() {
      console.log('completed logout');
      this.onLogoutCleanup();

   }

   onLogoutError() {
      console.log('There was an error trying to logout');
      this._loginService.logoutEvent.emit(this.user);
      this.onLogoutCleanup();
   }

   onLogoutCleanup() {
      console.log("cleanup")
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      this._loginService.logoutEvent.emit(this.user);
      this._router.parent.navigate(['Posts']);

   }

}

