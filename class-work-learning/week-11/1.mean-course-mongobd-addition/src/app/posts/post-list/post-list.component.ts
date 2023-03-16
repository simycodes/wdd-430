import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService){}
  ngOnInit() {
    this.postsService.getPosts();
    //  SUBSCRIBING TO A SUBJECT LISTENER CREATED IN THE POST SERVICE
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  // posts = [
  //   {
  //     title: "Amazing Grace",
  //     content: "Keep hustling and working hard and the lords grace should be sufficient for you!"
  //   },
  //   {
  //     title: "Atishani Apo!",
  //     content: "Do your best everyday!!"
  //   }
  // ]
}
