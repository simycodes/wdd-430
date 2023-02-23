import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // ACCESSING FORM VALUES USING @ViewChild(), GIVES ACCESS TO FORM VALUES EVEN BEFORE THE
  // FORM IS SUBMITTED
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = "pet"; // THE VALUES SHOULD BE EQUAL TO ANY VALUE IN THE option element
  // of the select element
  answer = "";

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
}
