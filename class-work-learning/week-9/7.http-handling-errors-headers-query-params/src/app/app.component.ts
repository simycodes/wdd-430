import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
 
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    // SUBSCRIBING TO ERRORS
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })

    this.isFetching = true;

    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => { // HANDLE ANY ERROR TO OCCUR
      this.isFetching = false;
      this.error = error.message;
   });
  }
  
  // CREATE A POST
  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  // GET ALL POSTS USING THE POSTS SERVICE
  onFetchPosts() {
   this.isFetching = true;

   this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
   }, error => {
      this.isFetching = false;
      this.error = error.message;
   });
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
     this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
