System.register(['@angular/core', '@angular/http', 'rxjs/Rx', './config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2, Rx_1, config_1;
    var LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            //import line below to be able to catch on observable.
            //however, you can catch from the caller's level using
            //this._postService.getPosts().subscribe(
            //     data => {this.posts = data},
            //     err => { }
            // );
            //import 'rxjs/add/operator/catch';
            LoginService = (function () {
                function LoginService(_http, _config) {
                    this._http = _http;
                    this._config = _config;
                    this.userLoggedIn = false;
                    this.loginEvent = new core_1.EventEmitter();
                    this.logoutEvent = new core_1.EventEmitter();
                }
                LoginService.prototype.login = function (user) {
                    console.log("adding post");
                    //this.dispatcher.emit("dispatching with data: logging in");
                    var body = JSON.stringify(user);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this._http
                        .post(this._config.getApiUrl() + '/api/accounts/login', body, options)
                        .map(function (res) { return res.json(); });
                };
                LoginService.prototype.createAccount = function (user) {
                    console.log("adding post");
                    var body = JSON.stringify(user);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this._http
                        .post(this._config.getApiUrl() + '/api/accounts', body, options)
                        .map(function (res) { return res.json(); });
                };
                LoginService.prototype.logout = function (authSessionToken) {
                    var body = JSON.stringify(authSessionToken);
                    var headers = new http_2.Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    console.log("logging out user, ", authSessionToken.accessToken);
                    //this api requires the access_token in the query string
                    return this._http
                        .post(this._config.getApiUrl()
                        + '/api/accounts/logout'
                        + '?access_token='
                        + authSessionToken.accessToken, body, options)
                        .map(function (res) { return res.json(); });
                    //return Observable.of({}).map(emptyobj =>JSON.stringify(emptyobj));
                };
                //TODO: 
                LoginService.prototype.loggedIn = function (jwt, userId) {
                    console.log("Got jwt / userid:", jwt, userId);
                    if (jwt === null || userId === null) {
                        this.userLoggedIn = false;
                    }
                    else {
                        this.userLoggedIn = true;
                    }
                    return Rx_1.Observable.of({ 'result': this.userLoggedIn }).map(function (res) { return res; });
                };
                LoginService.prototype.checkUsernameAvailable = function (username) {
                    var body = JSON.stringify({ "username": username });
                    var headers = new http_2.Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    //this api requires the access_token in the query string
                    return this._http
                        .post(this._config.getApiUrl()
                        + '/api/accounts/username_available', body, options)
                        .map(function (res) { return res.json(); });
                };
                LoginService.prototype.handleError = function (error) {
                    // in a real world app, we may send the error to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Rx_1.Observable.throw(error.json().error || 'Server error');
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], LoginService.prototype, "loginEvent", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], LoginService.prototype, "logoutEvent", void 0);
                LoginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, config_1.CONFIG])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=login.service.js.map