System.register(['@angular/core', '@angular/router-deprecated', './login.service'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, login_service_1;
    var LogoutForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            LogoutForm = (function () {
                function LogoutForm(_loginService, _router) {
                    this._loginService = _loginService;
                    this._router = _router;
                }
                LogoutForm.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('init');
                    var authSessionToken = {
                        accessToken: localStorage.getItem('jwt'),
                        userId: localStorage.getItem('userId')
                    };
                    if (authSessionToken.accessToken == null
                        || authSessionToken.accessToken == undefined
                        || authSessionToken.userId == null
                        || authSessionToken.userId === undefined) {
                        //do not make a logout request and go straight to cleanup
                        this.onLogoutCleanup();
                        return;
                    }
                    console.log("authSessionToken:", authSessionToken);
                    this._loginService.logout(authSessionToken)
                        .subscribe(function (data) { return _this.onLogoutComplete(); }, function (error) { return _this.onLogoutError(); }, function () { return _this.onLogoutCleanup(); });
                };
                LogoutForm.prototype.onLogoutComplete = function () {
                    console.log('completed logout');
                    this.onLogoutCleanup();
                };
                LogoutForm.prototype.onLogoutError = function () {
                    console.log('There was an error trying to logout');
                    this._loginService.logoutEvent.emit(this.user);
                    this.onLogoutCleanup();
                };
                LogoutForm.prototype.onLogoutCleanup = function () {
                    console.log("cleanup");
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('userId');
                    this._loginService.logoutEvent.emit(this.user);
                    this._router.parent.navigate(['Posts']);
                };
                LogoutForm = __decorate([
                    core_1.Component({
                        selector: 'logout-form',
                        template: '<h3>empty</h3>'
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService, router_deprecated_1.Router])
                ], LogoutForm);
                return LogoutForm;
            }());
            exports_1("LogoutForm", LogoutForm);
        }
    }
});
//# sourceMappingURL=logout-form.component.js.map