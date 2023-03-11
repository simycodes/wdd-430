import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './posts.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[]= [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  // FUNCTION TO GET A COPY OF ALL THE POSTS
  getPosts() {
    // BELOW CODE WORKS SAME AS posts.slice() -- makes a copy of an object - not by reference
    // return [...this.posts];
    this.http.get<{message: string, posts: Post[]}>(
      'http://localhost:3000/api/posts').subscribe((postData) => {
          this.posts = postData.posts;
          this.postsUpdated.next([...this.posts]);
      });
  }

  // THIS FUNCTION RETURNS A SUBJECT EVENT TO WHICH OTHER COMPONENTS CAN SUBSCRIBE TO
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  //FUNCTION TO ADD A POST
  addPost(id: string, title: string, content: string) {
    const post: Post = { 
      id: null,
      title: title,
      content: content
    };

    
    // ADD NEW POST TO THE DATABASE AND TO THE POSTS ARRAY
    this.http.post<{ message: string }>(
      'http://localhost:3000/api/posts', post).subscribe((responseData)=> {
        console.log(responseData.message);
        this.posts.push(post);
        // EMIT/SEND AN UPDATED LIST OF POSTS TO ALL COMPONENT NEEDING AN UPDATED LIST
        this.postsUpdated.next([...this.posts]);
      });
    
  }
}
