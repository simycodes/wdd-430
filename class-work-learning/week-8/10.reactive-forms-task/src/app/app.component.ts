import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ɵFormControlCtor } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  projectForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit() {
    // CREATING A NEW FORM USING TS CODE AND ADDING CONTROL INPUTS AS OBJECT PROPERTIES
    // bind(this) MAKES ngOnInit()  TO REFER TO forbiddenNames() DEFINED IN THIS CLASS
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, 
        CustomValidators.invalidProjectName], CustomValidators.asyncInvalidProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical')
    });

  // CUSTOM VALIDATOR - MUST RETURN NULL IF DATA PASSES THE VALIDATION
  // forbiddenNames(control: FormControl): {[s: string]: boolean} {
  //   if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
  //     return {'nameIsForbidden': true}
  //   }
  //   return null;
  // }

  // ASYNC CUSTOM VALIDATOR
  // forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value == 'test@test.com') {
  //         resolve({'EmailIsForbidden': true});
  //       }
  //       else {
  //         resolve(null);
  //       }
  //     },1500)
  //   });
  //   return promise;
  // }
  // function forbiddenEmails(control: any, FormControl: ɵFormControlCtor) {
  //   throw new Error('Function not implemented.');
  // }
  }

  onSaveProject() {
    console.log(this.projectForm.value);
  }

}
