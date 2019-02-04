import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';
import {RouteParams} from '@angular/router-deprecated';
import {CommentService} from './comment.service';
import {PostService} from './post.service';
import {Comment} from './comment';


//import * as moment from 'moment';
//import moment = require('moment');
declare var moment: any;

@Component({
	selector: 'comments',
	templateUrl: 'webapp/comment.component.html',
}) 

export class CommentComponent {
   commentForm: ControlGroup;
   formActive: boolean = true;

   //TODO:  
   //This needs to be set to "true" after user inserts
   //a new comment.  When this state is false (followed by inserting comment), cannot see new comments
   btnGetMoreCommentsEnabled: boolean = true;
   MAX_COMMENTS_PER_REQUEST = 2;

   //TODO: this is not input, just remove the Input() tag and
   //also remove the binding in the post-details view
   @Input() postId: string;
   @Input() comments: any;
   @Input() formInputText: string;

   //allows binding and will update the parent
   //component upon calling emit with the new data.
   @Output() commentsChange:EventEmitter<any> = new EventEmitter();

   constructor(
   	  private _commentService: CommentService,
   	  private _postService: PostService,
   	  private _formBuilder: FormBuilder,
        private _routeParams: RouteParams
   ) {}

   ngOnInit() {
   	  this.initForm();
        this.postId = this._routeParams.get('id');
        this._commentService.getPostComments(this.postId).subscribe(
            data => this.onSuccessGetPostComments(data),
            error => this.onErrorGetPostComments(error),
            () => {console.log("completed request")}
        )
   }

   initForm() {
   	  this.commentForm = this._formBuilder.group({
   	  	  'text': ['', Validators.required],
   	  	  'postId': ['', Validators.required]
   	  })
   }

   resetForm() {
   	  this.formInputText = "";
   	  this.formActive = false;  
   	  //angular bug when using *ngIf: removing and adding the form
   	  //via *ngIf, form will return to prestine state.prestine
   	  setTimeout(()=> this.formActive=true, 0);
   }

   onCommentSubmit(event) {
   	  event.preventDefault();
   	  console.log('postId', this.postId);
   	  let comment = {
   	  	  text: this.commentForm.value.text;
   	  	  postId: this.postId,
   	  	  accountId: +localStorage.getItem('userId')
   	  }

   	  this._commentService.addComment(comment).subscribe(
   	  	  data => this.onSuccessCommentSubmit(data),
   	  	  error => this.onErrorCommentSubmit(error),
   	  	  ()=> this.resetForm()
   	  )
   }

   onSuccessCommentSubmit(data: Comment) {
   		console.log("created comment", data);
         this.btnGetMoreCommentsEnabled = true;

         //prepend the newly added comment to the view
         //unshift will append to the beginning of the array
         //this.comments.unshift(data);
   		this._commentService.getPostComments(this.postId).subscribe(
	   	  	 data => this.onSuccessGetPostComments(data),
	   	  	 error => this.onErrorGetPostComments(error),
	   	  	 () => {console.log("completed request")}
   	  	)
   }

   onErrorCommentSubmit(err) {
   		console.log("error while attempting to add comment:", err);
   }

   onErrorGetPostComments(err) {
   		console.log("error while retrieving comments:", err);
   }


   onSuccessGetPostComments(comments) {
      console.log("Got post comments", comments)
      this.comments = comments.map(comment => {
           var dateFromNow = moment(comment.created).fromNow();
           var simpleDate = moment(comment.created).format('M/D/YYYY')
           comment.dateFromNow = dateFromNow;
           comment.simpleDate = simpleDate;
           return comment;

      });
   }

   onErrorGetPostComments(error) {
     // TODO: 
   }

   btnGetMoreCommentsClicked(post) {
      console.log("Get more comments clicked");
      let id = this._routeParams.get('id');
      let options = {};
      options['page'] = Math.floor(this.comments.length / this.MAX_COMMENTS_PER_REQUEST) + 1;
      this._commentService.getAdditionalComments(id, options).subscribe(
          data=> this.onSuccessGetMoreComments(data),
          error=> this.onErrorGetMoreComments(error),
          () => {console.log("Completed: getMoreComments()")}

      )
   }

   onSuccessGetMoreComments(comments: Comment[]) {
      console.log("appending comment data: ", comments);

      //disable the button when, no more comments to load
      if(comments.length < this.MAX_COMMENTS_PER_REQUEST) {
         this.btnGetMoreCommentsEnabled = false;
      }

      if(comments.length > 0) {
         comments.map(comment => {
            var dateFromNow = moment(comment.created).fromNow();
            var simpleDate = moment(comment.created).format('M/D/YYYY')
            comment.dateFromNow = dateFromNow;
            comment.simpleDate = simpleDate;
            this.comments.push(comment);

         })
      }
   }

   onErrorGetMoreComments(error: any) {
      console.log("error while getting more comments: ", error);

   }

   formatDates(comment: Comment) {
      return comments;
   }

}