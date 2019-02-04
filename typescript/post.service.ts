import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {POSTS} from './mock-posts';
import {Post} from './post';
import {Observable} from 'rxjs/Observable';
import {CONFIG} from './config';

@Injectable()
export class PostService {
  
  constructor(
    private _http:Http,
    private _config: CONFIG) {}

  addPost (post: Post) : Observable<Post>  {
    console.log("adding post")
    var accessToken = localStorage.getItem('jwt');
    var id = localStorage.getItem('userId');
    let body = JSON.stringify(post);
    let headers = new Headers({ 
          'Authorization': accessToken,
          'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
         .post(this._config.getApiUrl() + '/api/accounts/' + id + '/posts' + '?access_token=' + accessToken, body, options)
         .map((res:Response) => <Post> res.json())          
  }

	getPosts(options:any = {}) {
    var options = options || {};
    var MAX_POSTS_PER_PAGE: number = 2;
    var post_start_index: number = 0; 
    
    if(options['page']) {
        post_start_index = MAX_POSTS_PER_PAGE * (options['page'] - 1);
    }

    var accessToken = localStorage.getItem('jwt');

    let headers = new Headers({ 
          'Authorization': accessToken,
          'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({ headers: headers });

      return this._http
          .get(this._config.getApiUrl() + '/api/posts'
              + '?filter[include][account]'
              + '&filter[limit]=' + MAX_POSTS_PER_PAGE
              + '&filter[skip]=' + post_start_index
              + '&filter[order]=created%20DESC')
          .map((res:Response) => <Post[]>res.json())

      //return Promise.resolve(this._http.get('http://localhost:3000/api/posts?access_token=Puqffo9zNXnGE9WgV90JatwxzfHRrTahI6UjN6AaQvARD7Me5aZFbXAjfRFev8vA'))
		  //return Promise.resolve(POSTS);

	}

  getPostById(id: string) {
      return this._http
          .get(this._config.getApiUrl() + '/api/posts/' + id + '/?filter[include][account]')
          .map((res:Response) => <Post> res.json())
  }

  getPostComments(id: string) {
      var MAX_COMMENTS_PER_REQUEST = 2; 
      return this._http
          .get(this._config.getApiUrl() + '/api/posts/' + id + '/comments'
              + '?filter[include][account]'
              + '&filter[limit]=' + MAX_COMMENTS_PER_REQUEST
              + '&filter[order]=created%20DESC')
          .map((res:Response) => <Comment> res.json())

  }

  getAdditionalComments(id: string, options: any) {
      console.log("getAdditionalComment() with id, options: ", id, options);
      var options = options || {};
      var MAX_COMMENTS_PER_PAGE: number = 2;
      var comment_start_index: number = 0;

      if(options['page']) {
           comment_start_index = MAX_COMMENTS_PER_PAGE * (options['page'] - 1);
      }

      return this._http
          .get(this._config.getApiUrl() + '/api/posts/' + id + '/comments'
              + '?filter[include][account]'
              + '&filter[limit]=' + MAX_COMMENTS_PER_PAGE 
              + '&filter[skip]=' + comment_start_index)
          .map((res:Response) => <Comment> res.json())

  }

	getPostsSlowly() {
      return new Promise<Post[]>(resolve =>
        setTimeout(()=>resolve(POSTS), 2000) // 2 seconds
      );
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}

