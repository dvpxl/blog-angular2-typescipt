import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
// import {POSTS} from './mock-posts';
// import {Post} from './post';
import {Like} from './like';
import {Observable} from 'rxjs/Observable';
import {CONFIG} from './config';

//import line below to be able to catch on observable.
//however, you can catch from the caller's level using
//this._postService.getPosts().subscribe(
    //     data => {this.posts = data},
    //     err => { }
    // );
//import 'rxjs/add/operator/catch';

@Injectable()
export class LikeService {

  constructor(
    private _http:Http,
    private _config: CONFIG) {}


  addLike (like: Like) : Observable<Like>  {

    console.log("adding post")
    var accessToken = localStorage.getItem('jwt');
    var id = like.postId;

    let body = JSON.stringify(like);
    let headers = new Headers({ 
          'Authorization': accessToken,
          'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // return this._http
    //      .post(this._config.getApiUrl() + '/api/posts' + '?access_token=' + accessToken, body, options)
    //      .map((res:Response) => <Post> res.json())

    //http://localhost:3000/api/posts/1/like

    return this._http
         .post(this._config.getApiUrl() + '/api/posts/' + id + '/likes' + '?access_token=' + accessToken, body, options)
         .map((res:Response) => <Like> res.json())
                    
  }


  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}

