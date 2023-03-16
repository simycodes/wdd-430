import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './posts.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

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
    // return [...this.posts]; -- any datatype is used as data coming from db has _id property not corresponding to angular type id - hence use pipe and map to convert this
    this.http.get<{message: string, posts: any}>(
      'http://localhost:3000/api/posts')
      .pipe(map((postData)=> { // CONVERT _id to id OF THE INCOMING DATABASE DATA(POSTS)
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedPosts) => {
          this.posts = transformedPosts;
          this.postsUpdated.next([...this.posts]);
      });
  }

  // THIS FUNCTION RETURNS A SUBJECT EVENT TO WHICH OTHER COMPONENTS CAN SUBSCRIBE TO
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // FUNCTION TO ADD A POST
  addPost(id: string, title: string, content: string) {
    const post: Post = { 
      id: null,
      title: title,
      content: content
    };
 
    // ADD NEW POST TO THE DATABASE AND TO THE POSTS ARRAY
    this.http.post<{ message: string, postId: string }>(
      'http://localhost:3000/api/posts', post)
      .subscribe((responseData)=> {
        const id = responseData.postId;
        // UPDATE THE ID OF NEW POST FROM null TO DB _id - HELP HANDLE DELETION
        post.id = id;
        // UPDATE FRONT END POSTS AFTER ADDING THE SAME NEW POST TO THE DATABASE
        this.posts.push(post);
        // EMIT/SEND AN UPDATED LIST OF POSTS TO ALL COMPONENT NEEDING AN UPDATED LIST
        this.postsUpdated.next([...this.posts]);
      });
  }

  // FUNCTION TO DELETE A POST
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        console.log("deleted");
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


}
