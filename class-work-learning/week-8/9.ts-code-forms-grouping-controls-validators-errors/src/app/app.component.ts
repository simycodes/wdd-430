import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit() {
    // CREATING A NEW FORM USING TS CODE AND ADDING CONTROL INPUTS AS OBJECT PROPERTIES
    // bind(this) MAKES ngOnInit()  TO REFER TO forbiddenNames() DEFINED IN THIS CLASS
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)],
        this.forbiddenEmails),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }), 
      'gender': new FormControl('male'), // male IS THE DEFAULT VALUE
      'hobbies': new FormArray([])
    });

    // valueChanges AND statusChanges OBSERVABLE HOOKS
    this.signupForm.valueChanges.subscribe((value)=> console.log(value));
    this.signupForm.statusChanges.subscribe((status)=> console.log(status));

    // setValue SETS THE FORM INPUTS WITH  VALUES
    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@gmail.com',
      },
      'gender': 'male',
      'hobbies': []
    })

     // patchValue SETS PART OF THE FORM INPUTS WITH
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna',
      }
    })
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // CASTING HOBBY HOBBIES INTO A FORM ARRAY
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  // CUSTOM VALIDATOR - MUST RETURN NULL IF DATA PASSES THE VALIDATION
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}
    }
    return null;
  }

  // ASYNC CUSTOM VALIDATOR
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test@test.com') {
          resolve({'EmailIsForbidden': true});
        }
        else {
          resolve(null);
        }
      },1500)
    });
    return promise;
  }

   onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
}
