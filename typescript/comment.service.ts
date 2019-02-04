import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
// import {POSTS} from './mock-posts';
// import {Post} from './post';
import {Comment} from './comment';
import {Observable} from 'rxjs/Observable';
import {CONFIG} from './config';

// TOOD: testing for pagingation, increase this number
var MAX_COMMENTS_PER_REQUEST = 2;

@Injectable()
export class CommentService {
  constructor(
    private _http:Http,
    private _config: CONFIG
  ){}

  addComment (comment: Comment) : Observable<Comment>  {
    console.log("adding post")
    var accessToken = localStorage.getItem('jwt');
    var id = comment.postId;

    let body = JSON.stringify(comment);
    let headers = new Headers({ 
          'Authorization': accessToken,
          'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
         .post(this._config.getApiUrl() + '/api/posts/' + id + '/comments'
               +'?access_token=' + accessToken
               , body, options)
         .map((res:Response) => <Comment> res.json())               
  }

  getPostComments(postid: string) {
      return this._http
          .get(this._config.getApiUrl() + '/api/posts/' + postid + '/comments'
              + '?filter[include][account]'
              + '&filter[limit]=' + MAX_COMMENTS_PER_REQUEST
              + '&filter[order]=created%20DESC')
          .map((res:Response) => <Comment> res.json())
  }

  getAdditionalComments(postid: string, options: any) {
      console.log("getAdditionalComment() with id, options: ", postid, options);
      var options = options || {};
      var comment_start_index: number = 0;

      if(options['page']) {
           comment_start_index = MAX_COMMENTS_PER_PAGE * (options['page'] - 1);

      }

      return this._http
          .get(this._config.getApiUrl() + '/api/posts/' + postid + '/comments'
              + '?filter[include][account]'
              + '&filter[limit]=' + MAX_COMMENTS_PER_PAGE 
              + '&filter[skip]=' + comment_start_index
              + '&filter[order]=created%20DESC')
          .map((res:Response) => <Comment> res.json())

  }


  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}

