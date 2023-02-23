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
  genders = ['male', 'female'];

  // ALL ENTERED FORM DATA
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
    // // setValue - changes all input values of the form
    // this.signupForm.form.setValue({
    //   userData: {
    //     username: suggestedName
    //   }
    // })
  }

  onSubmit() {
    // console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
}
