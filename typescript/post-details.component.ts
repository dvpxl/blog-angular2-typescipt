import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {PostService} from './post.service';
import {CommentService} from './comment.service';
import {Post} from './post';
import {CommentComponent} from './comment.component';
import {MarkdownPipe} from './pipe/markdown.pipe';

declare var moment: any;
declare var hljs:any;  //TODO: highlight.js for syntax highlighting

@Component({
  selector: "post-details",
  templateUrl: "webapp/post-details.component.html",
  styleUrls: ['webapp/post-details.component.css'],
  directives: [CommentComponent],
  pipes: [MarkdownPipe]
})

export class PostDetailsComponent {
   post: Post = {};
   comments: any = [];

   constructor(
    private _postService: PostService,
    private _commentService: CommentService,
    private _routeParams: RouteParams 
   ){}

   ngOnInit() {

     console.log("ngOnInit(): post-details.compoenent")
     let id = this._routeParams.get('id');
     
     this._postService.getPostById(id).subscribe(
       data => this.onSuccessGetPostById(data),
       error => this.onErrorGetPostById(error),
       () => {console.log("completed request")}
     )
   }

   ngAfterViewChecked() {
      hljs.initHighlighting.called = false;
      hljs.initHighlighting();
   }

   onSuccessGetPostById(post) {
      console.log("Got post by id", post)
      post.moment = moment(post.created).fromNow();
      post.simpleDate = moment(post.created).format('M/D/YYYY');
      this.post = post;
      console.log("Post Details:  setting post var:", this.post);
   }

   onErrorGetPostById(error) {

   }
}
