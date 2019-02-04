System.register(['@angular/core', '@angular/http', 'rxjs/Observable', './config'], function(exports_1, context_1) {
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
    var core_1, http_1, http_2, Observable_1, config_1;
    var LikeService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
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
            LikeService = (function () {
                function LikeService(_http, _config) {
                    this._http = _http;
                    this._config = _config;
                }
                LikeService.prototype.addLike = function (like) {
                    console.log("adding post");
                    var accessToken = localStorage.getItem('jwt');
                    var id = like.postId;
                    var body = JSON.stringify(like);
                    var headers = new http_2.Headers({
                        'Authorization': accessToken,
                        'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    // return this._http
                    //      .post(this._config.getApiUrl() + '/api/posts' + '?access_token=' + accessToken, body, options)
                    //      .map((res:Response) => <Post> res.json())
                    //http://localhost:3000/api/posts/1/like
                    return this._http
                        .post(this._config.getApiUrl() + '/api/posts/' + id + '/likes' + '?access_token=' + accessToken, body, options)
                        .map(function (res) { return res.json(); });
                };
                LikeService.prototype.handleError = function (error) {
                    // in a real world app, we may send the error to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                LikeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, config_1.CONFIG])
                ], LikeService);
                return LikeService;
            }());
            exports_1("LikeService", LikeService);
        }
    }
});
//# sourceMappingURL=like.service.js.map