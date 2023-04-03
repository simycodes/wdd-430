import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit, OnDestroy {
  // contacts variable has datatype of an array of object of a Contact Model
  meals: Meal[] = []; 
  private subscription: Subscription; // THIS WILL STORE A SUBSCRIPTION PROCESS
  term: string;
  isLoading: boolean = false;

  // GET THE CONTACTS SERVICE
  constructor(private mealService: MealService) { }

  // USE CONTACT SERVICE TO INITIALIZE THE DOCUMENT-LIST COMPONENT ARRAY VARIABLE
  ngOnInit() {
    this.isLoading = true;
    // INITIALIZING THE MEALS WITH DATA FROM THE SERVICE(FROM FILE OR DB)
    this.mealService.getMeals();
    
    // SUBSCRIBING TO THE SUBJECT OBSERVABLE FROM THE DOCUMENT SERVICE
    // CHANGE THE LIST OF CONTACTS IN CASE OF ANY CONTACT BEING DELETED-UPDATED-ADDED
    this.subscription = this.mealService.mealListChangedEvent
      .subscribe((mealsList: Meal[]) => {
        this.meals = mealsList;
        this.isLoading = false;
      })
  }

  // FUNCTION TO USE THE SEARCH KEYWORD TYPED BY THE USER
  search(value: string) {
    this.term = value;
  }

  //UNSUBSCRIBING FROM THE SUBJECT OBSERVABLE
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
