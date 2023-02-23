import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    // CREATING A NEW FORM USING TS CODE AND ADDING CONTROL INPUTS AS OBJECT PROPERTIES
    this.signupForm =  new FormGroup({
      'username': new FormControl(null, Validators.required), // null IS THE DEFAULT VALUE
      'email': new FormControl(null, [Validators.required, Validators.email]), // ADDING MULTIPLE VALIDATORS USING AN ARRAY
      'gender': new FormControl('male'), // male IS THE DEFAULT VALUE
    })
  }

   onSubmit() {
    console.log(this.signupForm);
  }
}
