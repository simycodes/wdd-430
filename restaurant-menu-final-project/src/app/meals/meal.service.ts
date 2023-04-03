import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Meal } from './meal.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MealService {
  meals: Meal[] = [];
  // CREATE THE CONTACT SELECTED EVENT - TRIGGERS WHEN A CONTACT IN CONTACT LIST IS SELECTED
  mealSelectedEvent = new EventEmitter<Meal>();
  
  // CREATING THE SUBJECT OBSERVABLE FROM rxjs
  // EMITTER TO SIGNAL DELETION SO CHANGES CAN BE MADE TO ACTUAL LIST OF CONTACTS
  mealListChangedEvent = new Subject<Meal[]>();
  private maxMealId: number;

  constructor(private http: HttpClient) {
    // NEEDED TO MAKE MESSAGES HAVE A SENDER NAME ONCE CONTACTS LIST IS UPLOADED
    this.meals = this.getMeals();
    this.maxMealId = this.getMaxId();
  }

  // FUNCTION TO RETURN/GIVE ALL CONTACTS TO ALL COMPONENTS
  getMeals() {
    this.http.get('http://localhost:3000/meals')
    .subscribe((meals: Meal[])=> {
      this.meals = meals;
      this.maxMealId = this.getMaxId();
      this.meals.sort((a, b) => {
        if(a.name < b.name){
          return -1;
        }
        if(a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.mealListChangedEvent.next(this.meals.slice());
    },
    (error: any) => {
      console.log(error);
    }
    )

    // NEEDED TO MAKE MESSAGES HAVE A SENDER NAME ONCE CONTACTS LIST IS UPLOADED
    return this.meals.slice();
  }

  // FUNCTION TO FIND A SPECIFIC MEAL IN ARRAY OF MEALS
  getMeal(id: string): Meal {
    for (const meal of this.meals) {
      if (meal._id == id || meal.id == id) {
        return meal;
      }
      // GET A CONTACT FOR CONTACT DETAIL PAGE-COMPONENT
      if (meal.id == id) {
        return meal;
      }
    }
    
    return null;
  }

  // FUNCTION TO FIND THE MAX ID OF IN THE CURRENT DOCUMENT LIST
  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.meals) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // FUNCTION TO ADD A DOCUMENT
  addMeal(meal: Meal) {
    if (!meal) {
      return;
    }
    // make sure id of the new Document is empty
    meal.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ message: string, meal: Meal }>(
      'http://localhost:3000/meals', meal,{ headers: headers })
      .subscribe((responseData) => {
          // add new contact to documents
          console.log(responseData.meal);
          this.meals.push(responseData.meal);
          this.mealListChangedEvent.next(this.meals.slice())
        }
      );
  }

  // FUNCTION TO UPDATE A DOCUMENT
  updateMeal(originalMeal: Meal, newMeal: Meal) {
    if (!originalMeal || !newMeal) {
      return;
    }

    let pos = this.meals.indexOf(originalMeal);
    if (pos < 0) {
      return;
    }
    console.log(pos);
    // set the id of the new Document to the id of the old Document
    newMeal.id = originalMeal.id;
    newMeal._id = originalMeal._id;
    this.meals[pos] = newMeal;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.http.put('http://localhost:3000/meals/' + originalMeal.id,
      newMeal, { headers: headers })
      .subscribe((response: Response) => {
          this.meals[pos] = newMeal;
          this.mealListChangedEvent.next(this.meals.slice());
        }
      );
  }
  
  // FUNCTION TO DELETE A CONTACT
  deleteMeal(meal: Meal) {
    if (!meal) {
      return;
    }
    const pos = this.meals.indexOf(meal);
    if (pos < 0) {
      return;
    }
    console.log(pos);

    // delete from database -- String(contact.id))
    this.http.delete('http://localhost:3000/meals/' + meal.id)
      .subscribe((response: Response) => {
          this.meals.splice(pos, 1);
          this.mealListChangedEvent.next(this.meals.slice());
        }
      );

  }

}
