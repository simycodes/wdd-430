import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost() {
    // console.dir(postInput);
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    }
    // SEND DATA THROUGH AN EVENT EMITTER OR DATA EMITTER
    this.postCreated.emit(post);
  }
}
