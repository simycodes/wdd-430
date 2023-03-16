import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService){}

  onAddPost(form: NgForm) {
    // GET VALUES FROM THE FORM ENTERED BY THE USER
    if(form.invalid) {
      return;
    }
    // CALL SERVICE TO ADD POST
    this.postsService.addPost(null, form.value.title, form.value.content);
    form.resetForm();
  }
}
