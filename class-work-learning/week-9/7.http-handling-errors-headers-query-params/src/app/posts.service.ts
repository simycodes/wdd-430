import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType} from '@angular/common/http';
import { map, catchError, tap} from 'rxjs/operators';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  // SUBJECT TO HANDLE ERRORS
  error = new Subject<string>();

  constructor(private http: HttpClient) {}
  // IN ANGULAR REQUESTS ARE ONLY SENT WHEN WE SUBSCRIBE TO THEM
  // JS OBJECTS ARE AUTOMATICALLY CONVERTED TO JSON WHEN BEING SEND TO FIREBASE

  // FUNCTION TO CREATE AND STORE POSTS
  createAndStorePost(title: string, content: string) {
    // GET DATA FROM THE USER
    const postData: Post = { title: title, content: content }

    // Send Http request - /posts (creates a post folder on fire base) & .json is a requirement of firebase
    this.http.post<{ name: string }>(
      'https://ng-complete-guid-70e3f-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        // GETING ALL OR PARTIAL RESPONSE DATA
        // observe: 'body'
        observe: 'response'
      }
      ).subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  // FUNCTION TO GET ALL POSTS FROM DB-FIREBASE
  // A Pipeable (pipe) Operator is essentially a pure function which takes one Observable
  // as input and generates another Observable as output.
  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');

    return this.http
    .get<{ [key: string]: Post }>(
      'https://ng-complete-guid-70e3f-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty')
      }).pipe(map(responseData => {
      // pipe() IS AN OPERATOR CONVERTS INCOMING DATA TO USEFUL DATA ON THE FRONTEND
      // CONVERTING INCOMING JSON DATA INTO JS OBJECTS THAT CAN LOOPED THROUGH & DISPLAYED
      const postsArray: Post[] = [];
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key});
        }
      }
      return postsArray;
    }),
      catchError( errorRes => {
        // send error to analytics etc
        return throwError(errorRes);
      })
    );
    // .subscribe(posts => {
    //   console.log(posts);
    //   // ASSIGN POSTS FROM DATABASE TO LOCAL ARRAY
    //   this.loadedPosts = posts;
    // });
  }

  // FUNCTION TO DELETE POSTS
  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guid-70e3f-default-rtdb.firebaseio.com/posts.json',{
        observe: 'events',
        responseType: 'Json'
      }
    ).pipe(tap(event => {
      console.log(event);
      if(event.type ===  HttpEventType.Response){
        console.log(event.body);
      }
    }));
  }

}

