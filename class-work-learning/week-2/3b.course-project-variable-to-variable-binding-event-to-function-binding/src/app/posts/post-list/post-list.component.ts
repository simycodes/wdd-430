import { Component, Input } from '@angular/core';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts: Post[] = [];
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
