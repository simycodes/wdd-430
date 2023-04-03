import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meals-edit',
  templateUrl: './meals-edit.component.html',
  styleUrls: ['./meals-edit.component.css']
})
export class MealsEditComponent {
  originalMeal: Meal;
  meal: Meal;
  groupContacts: Meal[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private mealService: MealService,
    private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit() {
    // CHECK IF A CONTACT ID IS PASSED TO KNOW IF WE EDITING OR ADDING A NEW DOCUMENT
    this.route.params.subscribe((params: Params) => { 
      this.id = params['id'];
      // CHECK IF ANY DOCUMENT ID IS PASSED
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalMeal = this.mealService.getMeal(this.id);

      if (!this.originalMeal) {
        return;
      }
      this.editMode = true;
      // copies originalDocument object and into this.document object - no reference passed
      this.meal = JSON.parse(JSON.stringify(this.originalMeal));
    })
  }

  // FUNCTION TO ADD AND UPDATE A CONTACT ITEM
  onSubmit(contactForm: NgForm) {
    // GET VALUES FROM FORM AND ASSIGN THEM
    let _id = '';
    let id = " ";
    let name = contactForm.value.name;
    let price = contactForm.value.price;
    let category = contactForm.value.category;
    let imageUrl = contactForm.value.imageUrl;
    let description = contactForm.value.description;
    //CREATE NEW DOCUMENT USING THE DATA FROM THE USER 
    const newMeal = new Meal(_id, id, name, price, category, imageUrl, description);

    if (this.editMode == true) {
      this.mealService.updateMeal(this.originalMeal, newMeal)
    }
    else {
      this.mealService.addMeal(newMeal);
    }
    // GO BACK TO THE DOCUMENTS ONLY PAGE
    this.router.navigate(['/meals']);
  }

  onCancel() {
    // GO BACK TO THE DOCUMENTS ONLY PAGE
    this.router.navigate(['/meals']);
  }
}
