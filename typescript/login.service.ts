import {Injectable, Input, Output, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {User} from './user';
import {AuthSessionToken} from './auth-session-token'
import {Observable} from 'rxjs/Rx';
import {CONFIG} from './config';

@Injectable()
export class LoginService {

  userLoggedIn: boolean = false;
  @Output() loginEvent: EventEmitter<any> = new EventEmitter();
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private _http:Http,
    private _config:CONFIG
  ) {}


  login (user: User) : Observable<User>  {
    //this.dispatcher.emit("dispatching with data: logging in");
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
         .post(this._config.getApiUrl() + '/api/accounts/login', body, options)
         .map((res:Response) => res.json());      
  }

  createAccount(user: User) : Observable<User> {
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
 
    return this._http
         .post(this._config.getApiUrl() + '/api/accounts', body, options)
         .map((res:Response) => res.json());
  }

  logout(authSessionToken: AuthSessionToken) {
    let body = JSON.stringify(authSessionToken);
    let headers = new Headers({ 
          'Content-Type': 'application/json',
          'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    console.log("logging out user, ", authSessionToken.accessToken);

    //this api requires the access_token in the query string
    //TODO: fix
    return this._http
        .post(this._config.getApiUrl() 
              + '/api/accounts/logout' 
              + '?access_token=' 
              + authSessionToken.accessToken, body, options)
        .map((res:Response) => res.json());

    //return Observable.of({}).map(emptyobj =>JSON.stringify(emptyobj));

  }

  checkUsernameAvailable(username: string) {
    let body = JSON.stringify({"username": username})
    let headers = new Headers({ 
          'Content-Type': 'application/json',
          'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    //this api requires the access_token in the query string
    //TODO: fix
    return this._http
        .post(this._config.getApiUrl() 
              + '/api/accounts/username_available', body, options)
        .map((res:Response) => res.json());
  }


  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}

