import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }
  // IN ANGULAR REQUESTS ARE ONLY SENT WHEN WE SUBSCRIBE TO THEM

  // JS OBJECTS ARE AUTOMATICALLY CONVERTED TO JSON WHEN BEING SEND TO FIREBASE
  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request - /posts (creates a post folder on fire base) & .json is a requirement of firebase
    this.http.post<{ name: string }>(
      'https://ng-complete-guid-70e3f-default-rtdb.firebaseio.com/posts.json',
      postData
      ).subscribe(responseData => {
        console.log(responseData);
      });
  }

  // FUNCTION TO FETCH DATA-POSTS
  // A Pipeable (pipe) Operator is essentially a pure function which takes one Observable
  // as input and generates another Observable as output.
  private fetchPosts() {
    this.isFetching = true;
    this.http
    .get<{ [key: string]: Post }>('https://ng-complete-guid-70e3f-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      // pipe() IS AN OPERATOR CONVERTS INCOMING DATA TO USEFUL DATA ON THE FRONTEND
      // CONVERTING INCOMING JSON DATA INTO JS OBJECTS THAT CAN LOOPED THROUGH & DISPLAYED
      const postsArray: Post[] = [];
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key});
        }
      }
      return postsArray;
    }))
    .subscribe(posts => {
      console.log(posts);
      this.isFetching = false;
      // ASSIGN POSTS FROM DATABASE TO LOCAL ARRAY
      this.loadedPosts = posts;
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}
