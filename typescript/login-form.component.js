System.register(['@angular/core', '@angular/router-deprecated', '@angular/common', './login.service', './config'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, common_1, login_service_1, config_1;
    var LoginForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            LoginForm = (function () {
                function LoginForm(_formBuilder, _router, _loginService, _CONFIG) {
                    this._formBuilder = _formBuilder;
                    this._router = _router;
                    this._loginService = _loginService;
                    this._CONFIG = _CONFIG;
                    this.inProgressLogin = false;
                }
                LoginForm.prototype.ngOnInit = function () {
                    this.initFormBuilder();
                };
                LoginForm.prototype.initFormBuilder = function () {
                    this.loginForm = this._formBuilder.group({
                        'email': ['', common_1.Validators.required],
                        'password': ['', common_1.Validators.required],
                    });
                    this.createAccountForm = this._formBuilder.group({
                        'email': ['', common_1.Validators.required],
                        'password': ['', common_1.Validators.required],
                        'username': ['', common_1.Validators.required],
                    });
                };
                LoginForm.prototype.onLogin = function (event) {
                    var _this = this;
                    event.preventDefault();
                    this.inProgressLogin = true;
                    console.log(this._CONFIG.getApiUrl());
                    console.log("Login Submitted with value: " + this.loginForm.value);
                    this._loginService.login(this.loginForm.value).subscribe(function (data) {
                        console.log("Got Data1:", data);
                        _this.onLoginComplete(data);
                    }, function (error) { _this.onLoginError(error); });
                };
                LoginForm.prototype.onCreateAccount = function (event) {
                    var _this = this;
                    event.preventDefault();
                    console.log("CreateLogin form Submitted with value: " + this.createAccountForm.value);
                    this._loginService.createAccount(this.createAccountForm.value).subscribe(function (data) { _this.onCreateAccountComplete(data); }, function (error) { _this.onCreateAccountError(error); });
                };
                LoginForm.prototype.onLoginComplete = function (data) {
                    this.user = data;
                    console.log("Got Data:", data);
                    localStorage.setItem("jwt", data.id);
                    localStorage.setItem("userId", data.userId);
                    this._loginService.loginEvent.emit(this.user);
                    this._router.parent.navigate(['Posts']);
                };
                LoginForm.prototype.onLoginError = function (err) {
                    this.errorMessageLogin = JSON.parse(err._body);
                    this.inProgressLogin = false;
                };
                LoginForm.prototype.onCreateAccountComplete = function (data) {
                    this.user = data;
                    this.successMessageCreateAccount = "Awesome!  Please login above with your new account";
                };
                LoginForm.prototype.onCreateAccountError = function (err) {
                    this.errorMessageCreateAccount = JSON.parse(err._body);
                };
                //method will check if the username is available during account creation
                LoginForm.prototype.checkUsernameAvailable = function (event) {
                    console.log("checking if username available:", this.createAccountForm.value.username);
                    this._loginService.checkUsernameAvailable(this.createAccountForm.value.username).subscribe(function (data) { console.log("Username available?", data); }, function (error) { console.log("Error checking username", error); });
                };
                LoginForm.prototype.usernameAvailable = function () {
                    return true;
                };
                LoginForm = __decorate([
                    core_1.Component({
                        selector: "login-form",
                        templateUrl: 'webapp/login-form.component.html',
                        styleUrls: ['webapp/login-form.component.css'],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_deprecated_1.Router, login_service_1.LoginService, config_1.CONFIG])
                ], LoginForm);
                return LoginForm;
            }());
            exports_1("LoginForm", LoginForm);
        }
    }
});
//# sourceMappingURL=login-form.component.js.map