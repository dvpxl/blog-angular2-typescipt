System.register(['@angular/core', '@angular/router-deprecated', '@angular/common', './post.service', './pipe/markdown.pipe'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, common_1, post_service_1, markdown_pipe_1;
    var PostSubmitForm;
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
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (markdown_pipe_1_1) {
                markdown_pipe_1 = markdown_pipe_1_1;
            }],
        execute: function() {
            PostSubmitForm = (function () {
                function PostSubmitForm(_formBuilder, _postService, _router) {
                    this._formBuilder = _formBuilder;
                    this._postService = _postService;
                    this._router = _router;
                }
                PostSubmitForm.prototype.ngOnInit = function () {
                    this.initFormBuilder();
                };
                PostSubmitForm.prototype.initFormBuilder = function () {
                    this.addPostForm = this._formBuilder.group({
                        'title': ['', common_1.Validators.required],
                        'url': ['', common_1.Validators.required],
                        'text': ['', common_1.Validators.required],
                    });
                };
                PostSubmitForm.prototype.addPost = function (event) {
                    var _this = this;
                    event.preventDefault();
                    console.log("Submit button clicked with data: ", this.addPostForm.value);
                    this._postService.addPost(this.addPostForm.value).subscribe(function (data) { _this.handleOnPostComplete(data); }, function (error) { _this.handleOnPostError(error); });
                };
                PostSubmitForm.prototype.handleOnPostComplete = function (post) {
                    this.post = post;
                    this._router.parent.navigate(['Posts']);
                };
                PostSubmitForm.prototype.handleOnPostError = function (error) {
                    console.log("Error occurred: ", error);
                    if (error.status === 401) {
                        this.errorMessage = "You appear to be logged out.  Please login first";
                        return;
                    }
                    if (error.status === 404) {
                        //404 response when userId is not found.   Is someone trying to inject userid?
                        this.errorMessage = "The following request is not found: " + error.url;
                        return;
                    }
                    this.errorMessage = "An unknown error has occurred.  Please try again.";
                };
                PostSubmitForm = __decorate([
                    core_1.Component({
                        selector: 'post-submit-form',
                        templateUrl: 'webapp/post-submit-form.component.html',
                        styleUrls: ['webapp/post-details.component.css', 'css/mathexl.math.min.css'],
                        pipes: [markdown_pipe_1.MarkdownPipe],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, post_service_1.PostService, router_deprecated_1.Router])
                ], PostSubmitForm);
                return PostSubmitForm;
            }());
            exports_1("PostSubmitForm", PostSubmitForm);
        }
    }
});
//# sourceMappingURL=post-submit-form.component.js.map