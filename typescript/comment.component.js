System.register(['@angular/core', '@angular/common', '@angular/router-deprecated', './comment.service', './post.service'], function(exports_1, context_1) {
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
    var core_1, common_1, router_deprecated_1, comment_service_1, post_service_1;
    var CommentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (comment_service_1_1) {
                comment_service_1 = comment_service_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            }],
        execute: function() {
            CommentComponent = (function () {
                function CommentComponent(_commentService, _postService, _formBuilder, _routeParams) {
                    this._commentService = _commentService;
                    this._postService = _postService;
                    this._formBuilder = _formBuilder;
                    this._routeParams = _routeParams;
                    this.formActive = true;
                    //TODO:  
                    //This needs to be set to "true" after user inserts
                    //a new comment.  When this state is false, and user inserts
                    //comment, its a bug to remain false and user cannot see
                    //remaining comments.
                    this.btnGetMoreCommentsEnabled = true;
                    this.MAX_COMMENTS_PER_REQUEST = 2;
                    //literally, requires a xChange variable, where x is an input variable.
                    //this will allow double binding and will update the parent
                    //component upon calling emit with the new data.
                    this.commentsChange = new core_1.EventEmitter();
                }
                CommentComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.initForm();
                    this.postId = this._routeParams.get('id');
                    this._commentService.getPostComments(this.postId).subscribe(function (data) { return _this.onSuccessGetPostComments(data); }, function (error) { return _this.onErrorGetPostComments(error); }, function () { console.log("completed request"); });
                };
                CommentComponent.prototype.initForm = function () {
                    this.commentForm = this._formBuilder.group({
                        'text': ['', common_1.Validators.required],
                        'postId': ['', common_1.Validators.required]
                    });
                };
                CommentComponent.prototype.resetForm = function () {
                    var _this = this;
                    this.formInputText = "";
                    this.formActive = false;
                    //angular bug.  by removing and adding the form
                    //via *ngIf, the form will return to prestine state.prestine
                    setTimeout(function () { return _this.formActive = true; }, 0);
                };
                CommentComponent.prototype.onCommentSubmit = function (event) {
                    var _this = this;
                    event.preventDefault();
                    console.log('postId', this.postId);
                    var comment = {
                        text: this.commentForm.value.text,
                        postId: this.postId,
                        accountId: +localStorage.getItem('userId')
                    };
                    this._commentService.addComment(comment).subscribe(function (data) { return _this.onSuccessCommentSubmit(data); }, function (error) { return _this.onErrorCommentSubmit(error); }, function () { return _this.resetForm(); });
                };
                CommentComponent.prototype.onSuccessCommentSubmit = function (data) {
                    var _this = this;
                    console.log("created comment", data);
                    this.btnGetMoreCommentsEnabled = true;
                    // //prepend the newly added comment to the view
                    // //unshift will append to the beginning of the array
                    // this.comments.unshift(data);
                    this._commentService.getPostComments(this.postId).subscribe(function (data) { return _this.onSuccessGetPostComments(data); }, function (error) { return _this.onErrorGetPostComments(error); }, function () { console.log("completed request"); });
                };
                CommentComponent.prototype.onErrorCommentSubmit = function (err) {
                    console.log("error while attempting to add comment:", err);
                };
                CommentComponent.prototype.onErrorGetPostComments = function (err) {
                    console.log("error while retrieving comments:", err);
                };
                CommentComponent.prototype.onSuccessGetPostComments = function (comments) {
                    console.log("Got post comments", comments);
                    this.comments = comments.map(function (comment) {
                        var dateFromNow = moment(comment.created).fromNow();
                        var simpleDate = moment(comment.created).format('M/D/YYYY');
                        comment.dateFromNow = dateFromNow;
                        comment.simpleDate = simpleDate;
                        return comment;
                    });
                };
                CommentComponent.prototype.onErrorGetPostComments = function (error) {
                };
                CommentComponent.prototype.btnGetMoreCommentsClicked = function (post) {
                    var _this = this;
                    console.log("Get more comments clicked");
                    var id = this._routeParams.get('id');
                    var options = {};
                    options['page'] = Math.floor(this.comments.length / this.MAX_COMMENTS_PER_REQUEST) + 1;
                    this._commentService.getAdditionalComments(id, options).subscribe(function (data) { return _this.onSuccessGetMoreComments(data); }, function (error) { return _this.onErrorGetMoreComments(error); }, function () { console.log("Completed: getMoreComments()"); });
                };
                CommentComponent.prototype.onSuccessGetMoreComments = function (comments) {
                    var _this = this;
                    console.log("appending comment data: ", comments);
                    //disable the button.
                    //when the returned amount is < MAX_COMMENTS_PER_REQUEST
                    //then there are no more comments to load.
                    if (comments.length < this.MAX_COMMENTS_PER_REQUEST) {
                        this.btnGetMoreCommentsEnabled = false;
                    }
                    if (comments.length > 0) {
                        comments.map(function (comment) {
                            var dateFromNow = moment(comment.created).fromNow();
                            var simpleDate = moment(comment.created).format('M/D/YYYY');
                            comment.dateFromNow = dateFromNow;
                            comment.simpleDate = simpleDate;
                            _this.comments.push(comment);
                        });
                    }
                };
                CommentComponent.prototype.onErrorGetMoreComments = function (error) {
                    console.log("error while getting more comments: ", error);
                };
                CommentComponent.prototype.formatDates = function (comment) {
                    return comments;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], CommentComponent.prototype, "postId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], CommentComponent.prototype, "comments", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], CommentComponent.prototype, "formInputText", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CommentComponent.prototype, "commentsChange", void 0);
                CommentComponent = __decorate([
                    core_1.Component({
                        selector: 'comments',
                        templateUrl: 'webapp/comment.component.html',
                    }), 
                    __metadata('design:paramtypes', [comment_service_1.CommentService, post_service_1.PostService, common_1.FormBuilder, router_deprecated_1.RouteParams])
                ], CommentComponent);
                return CommentComponent;
            }());
            exports_1("CommentComponent", CommentComponent);
        }
    }
});
//# sourceMappingURL=comment.component.js.map