import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Post} from './post';
import {PostService} from './post.service';
import {MarkdownPipe} from './pipe/markdown.pipe';

@Component({
  selector: 'post-submit-form',
  templateUrl: 'webapp/post-submit-form.component.html',
  styleUrls: ['webapp/post-details.component.css', 'css/mathexl.math.min.css'],
  pipes: [MarkdownPipe],
   //encapsulation: ViewEncapsulation.Native
  // encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.Emulated is default
})

export class PostSubmitForm {
   addPostForm: ControlGroup;
   post: Post;
   errorMessage: any;

   constructor(
      private _formBuilder: FormBuilder,
      private _postService: PostService,
      private _router: Router

    ) {  }

   ngOnInit() {
      this.initFormBuilder();
   }

   initFormBuilder() {
      this.addPostForm = this._formBuilder.group({
          'title': ['', Validators.required],
          'url': ['', Validators.required],
          'text': ['', Validators.required],
          
      });
      
   }

   addPost(event) {
       event.preventDefault();
       console.log("Submit button clicked with data: ", this.addPostForm.value);
       this._postService.addPost(this.addPostForm.value).subscribe(
          data => {this.handleOnPostComplete(data)},
          error => {this.handleOnPostError(error)}
       );
   }

   handleOnPostComplete(post) {
      this.post = post;
      this._router.parent.navigate(['Posts']);
   }

   handleOnPostError(error) {
        console.log("Error occurred: ", error);
        if(error.status === 401) {
           this.errorMessage = "You appear to be logged out.  Please login first";
           return;
        }

        if(error.status === 404) {
           //404 response when userId is not found.   Is someone trying to inject userid?
           this.errorMessage = "The following request is not found: " + error.url;
           return;
        }
        this.errorMessage = "An unknown error has occurred.  Please try again."
        
   }
}