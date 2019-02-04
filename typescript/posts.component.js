System.register(['@angular/core', '@angular/router-deprecated', './post.service', './like.service', './pipe/markdown.pipe'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, post_service_1, like_service_1, markdown_pipe_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (like_service_1_1) {
                like_service_1 = like_service_1_1;
            },
            function (markdown_pipe_1_1) {
                markdown_pipe_1 = markdown_pipe_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postService, _likeService, _router, _routeParams) {
                    this._postService = _postService;
                    this._likeService = _likeService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.currentPage = 1;
                    this.errorMessage = null;
                    this.btnGetMorePostsEnabled = true;
                    this.textIsCode = false;
                    console.log("prismobj", Prism);
                }
                PostsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //query paramter for particular page/pagination
                    var page = +this._routeParams.get("page");
                    var requestOptions = {
                        'page': 1
                    };
                    if (page === null || page === undefined) {
                        page = 1;
                    }
                    if (!(page >= 1 && page <= 20)) {
                        //default to page 1 if not within known bounds
                        page = 1;
                    }
                    if (page) {
                        console.log("page query is value: ", page);
                        //set the value to the request options
                        requestOptions['page'] = page;
                    }
                    //TODO:  organize posts by created date
                    this._postService.getPosts(requestOptions).subscribe(function (data) { return _this.onGetPostsSuccess(data); }, function (error) { return _this.onGetPostsError(error); });
                };
                PostsComponent.prototype.ngAfterViewChecked = function () {
                    this.onCodeHighlight();
                };
                PostsComponent.prototype.ngAfterViewInit = function () {
                    //google ads
                    (adsbygoogle = adsbygoogle || []).push({});
                };
                // this.posts = this.posts.map(post => {
                //        //here we update the the metaInfo so that the 
                //        //view is updated via the bindings.
                //        if(post.id == vote.postId) {
                //            post.metaInfo.likes++;
                //        }
                //        return post;
                //    });
                PostsComponent.prototype.onGetPostsSuccess = function (data) {
                    console.log("OnGetPostsSuccess: ", data);
                    var dataGroupByDate = {};
                    if (data.length == 0) {
                        this.btnGetMorePostsEnabled = false;
                        return;
                    }
                    this.posts = data;
                    this.posts = data.map(function (post) {
                        var returnData = {};
                        //TODO: filter by post created date.
                        console.log("Success:  onGetPostsSuccess: ", data);
                        //get the created date, this will be the key:
                        var created = post.created;
                        console.log("Created Date:", post.created);
                        var formatDate = moment(post.created).fromNow();
                        console.log("Formatted Date:", formatDate);
                        post.created = formatDate;
                        //this.onGetPostsSuccess(data);
                        return post;
                    });
                };
                PostsComponent.prototype.onGetPostsError = function (error) {
                    this.errorMessage = error;
                };
                PostsComponent.prototype.onPostClick = function (post) {
                    this._router.parent.navigate(['PostDetail', { id: post.id }]);
                };
                PostsComponent.prototype.onVoteUpClick = function (post) {
                    var _this = this;
                    console.log("up vote clicked for: ", post);
                    var like = {
                        postId: post.id,
                        accountId: localStorage.getItem("userid")
                    };
                    this._likeService.addLike(like).subscribe(function (data) { return _this.onUpVoteSuccess(data); }, function (error) { return _this.onUpVoteError(error); });
                };
                PostsComponent.prototype.onUpVoteSuccess = function (vote) {
                    console.log("Created Like: ", vote);
                    // var currentPost = this.posts.filter(post => post.id == vote.postId);
                    //map to iterate through each post[] object.
                    //we want to update the post meta data that
                    //was just modified.
                    this.posts = this.posts.map(function (post) {
                        //here we update the the metaInfo so that the 
                        //view is updated via the bindings.
                        if (post.id == vote.postId) {
                            post.metaInfo.likes++;
                        }
                        return post;
                    });
                };
                //handler for when the getMorePosts button
                //is clicked.
                PostsComponent.prototype.onGetNextPage = function () {
                    //query paramter for particular page/pagination
                    var page = +this._routeParams.get("page");
                    if (page === null || page === undefined) {
                        page = 1;
                    }
                    if (!(page >= 1 && page <= 20)) {
                        //default to page 1 if not within known bounds
                        page = 1;
                    }
                    this._router.parent.navigate(['Posts', { page: ++page }]);
                };
                PostsComponent.prototype.onUpVoteError = function (error) {
                    console.log("Error while add like: ", error);
                    var error_body = JSON.parse(error._body);
                    console.log("Got Error:", error_body);
                    this.errorMessage = error_body.error.message;
                };
                PostsComponent.prototype.onCodeHighlight = function () {
                    Prism.highlightAll();
                    hljs.initHighlighting.called = false;
                    hljs.initHighlighting();
                };
                PostsComponent.prototype.dismissAlert = function () {
                    this.errorMessage = undefined;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PostsComponent.prototype, "posts", void 0);
                PostsComponent = __decorate([
                    core_1.Component({
                        selector: 'posts',
                        templateUrl: 'webapp/posts.component.html',
                        styleUrls: ['webapp/posts.component.css', 'css/prism.css'],
                        pipes: [markdown_pipe_1.MarkdownPipe]
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService, like_service_1.LikeService, router_deprecated_1.Router, router_deprecated_1.RouteParams])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map