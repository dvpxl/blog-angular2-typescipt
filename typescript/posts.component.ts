import {Component, Input, Output, OnInit, AfterContentInit, AfterViewChecked} from '@angular/core';
import {Router, RouteParams} from '@angular/router-deprecated';
import {Post} from './post';
import {Like } from './like';
import {PostService} from './post.service';
import {LikeService} from './like.service';

import {MarkdownPipe} from './pipe/markdown.pipe'

declare var moment: any;
declare var Prism:any;
declare var hljs:any;
declare var adsbygoogle: any;

@Component({
  selector: 'posts',
  templateUrl: 'webapp/posts.component.html',
  styleUrls: ['webapp/posts.component.css', 'css/prism.css'],
  pipes: [MarkdownPipe]

})

export class PostsComponent {

  @Input()
  posts: Post[];

  private currentPage: number = 1;
  private errorMessage: string = null;
  private btnGetMorePostsEnabled = true;
  private textIsCode = false;

  constructor(
     private _postService: PostService,
     private _likeService: LikeService,
     private _router: Router, 
     private _routeParams: RouteParams
  
  ) { 
     console.log("prismobj", Prism);
  }

  ngOnInit() {

    //query paramter for particular page/pagination
    var page:number = +this._routeParams.get("page");
  
    var requestOptions = {
      'page': 1
    };

    if(page === null || page === undefined) {
       page = 1;
    }

    if(!(page >= 1 && page <= 20)) {
       //default to page 1 if not within known bounds
       page = 1;
    }

    if(page) {
       console.log("page query is value: ", page);
       //set the value to the request options
       requestOptions['page'] = page;
    }

    //TODO:  organize posts by created date
    this._postService.getPosts(requestOptions).subscribe(
        data => this.onGetPostsSuccess(data),
        error => this.onGetPostsError(error)
    );

  }

  ngAfterViewChecked() {
    this.onCodeHighlight();
  }

  ngAfterViewInit() {
    //google ads
    (adsbygoogle = adsbygoogle || []).push({});
  }

  onGetPostsSuccess(data: Post[]) {

    console.log("OnGetPostsSuccess: ", data);
    var dataGroupByDate = {};
    if(data.length == 0 ) {

       this.btnGetMorePostsEnabled = false;
       return;
    }

    this.posts = data;
    this.posts = data.map(post => {

       var returnData = {};
       //TODO: filter by post created date.
       console.log("Success:  onGetPostsSuccess: ", data);
       //get the created date, this will be the key:
       var created = post.created;
       console.log("Created Date:", post.created); 

       var formatDate = moment(post.created).fromNow();
       console.log("Formatted Date:", formatDate)
       post.created = formatDate;

       //this.onGetPostsSuccess(data);
       return post;

    });

  }

  onGetPostsError(error) {
      this.errorMessage = error;
  }

  onPostClick(post: Post) {
      this._router.parent.navigate(['PostDetail', {id: post.id}]);
  }

  onVoteUpClick(post: Post) {
      console.log("up vote clicked for: ", post);
      let like = {
         postId: post.id,
         accountId: localStorage.getItem("userid")
      }

      this._likeService.addLike(like).subscribe(
          data => this.onUpVoteSuccess(data),
          error => this.onUpVoteError(error)
      )
  }

  onUpVoteSuccess(vote) {
     console.log("Created Like: ", vote);
     this.posts = this.posts.map(post => {

         //here we update the the metaInfo so that the 
         //view is updated via the bindings.
         if(post.id == vote.postId) {
             post.metaInfo.likes++;
         }
         return post;
     });
  }

  //handler for when the getMorePosts button
  //is clicked.
  onGetNextPage() {
      var page:number = +this._routeParams.get("page");
      if(page === null || page === undefined) {
         page = 1;
      }

      if(!(page >= 1 && page <= 20)) {
         //default to page 1 if not within known bounds
         page = 1;
      }
      this._router.parent.navigate(['Posts', {page: ++page}]);
  }

  onUpVoteError(error) {
      console.log("Error while add like: ", error);
      var error_body = JSON.parse(error._body);
      console.log("Got Error:", error_body);
      this.errorMessage = error_body.error.message;
  
  }

  //TODO: experimental
  onCodeHighlight() {
    Prism.highlightAll();
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();

  }

  dismissAlert() {
    this.errorMessage = undefined;
  }
}
