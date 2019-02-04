System.register(['@angular/core', '@angular/router-deprecated', './post.service', './comment.service', './comment.component', './pipe/markdown.pipe'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, post_service_1, comment_service_1, comment_component_1, markdown_pipe_1;
    var PostDetailsComponent;
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
            function (comment_service_1_1) {
                comment_service_1 = comment_service_1_1;
            },
            function (comment_component_1_1) {
                comment_component_1 = comment_component_1_1;
            },
            function (markdown_pipe_1_1) {
                markdown_pipe_1 = markdown_pipe_1_1;
            }],
        execute: function() {
            PostDetailsComponent = (function () {
                function PostDetailsComponent(_postService, _commentService, _routeParams) {
                    this._postService = _postService;
                    this._commentService = _commentService;
                    this._routeParams = _routeParams;
                    this.post = {};
                    this.comments = [];
                }
                PostDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log("ngOnInit(): post-details.compoenent");
                    var id = this._routeParams.get('id');
                    this._postService.getPostById(id).subscribe(function (data) { return _this.onSuccessGetPostById(data); }, function (error) { return _this.onErrorGetPostById(error); }, function () { console.log("completed request"); });
                    // MOVED TO comment component
                    // this._postService.getPostComments(id).subscribe(
                    // 	 data => this.onSuccessGetPostComments(data),
                    // 	 error => this.onErrorGetPostComments(error),
                    // 	 () => {console.log("completed request")}
                    // )
                };
                PostDetailsComponent.prototype.ngAfterViewChecked = function () {
                    hljs.initHighlighting.called = false;
                    hljs.initHighlighting();
                };
                PostDetailsComponent.prototype.onSuccessGetPostById = function (post) {
                    console.log("Got post by id", post);
                    post.moment = moment(post.created).fromNow();
                    post.simpleDate = moment(post.created).format('M/D/YYYY');
                    this.post = post;
                    console.log("Post Details:  setting post var:", this.post);
                };
                PostDetailsComponent.prototype.onErrorGetPostById = function (error) {
                };
                PostDetailsComponent = __decorate([
                    core_1.Component({
                        selector: "post-details",
                        templateUrl: "webapp/post-details.component.html",
                        styleUrls: ['webapp/post-details.component.css'],
                        directives: [comment_component_1.CommentComponent],
                        pipes: [markdown_pipe_1.MarkdownPipe]
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService, comment_service_1.CommentService, router_deprecated_1.RouteParams])
                ], PostDetailsComponent);
                return PostDetailsComponent;
            }());
            exports_1("PostDetailsComponent", PostDetailsComponent);
        }
    }
});
//# sourceMappingURL=post-details.component.js.map