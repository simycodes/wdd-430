import { Pipe, PipeTransform } from '@angular/core';
import { Meal } from './meal.model';

@Pipe({
  name: 'mealsFilter'
  // 'contactsFilter IS WHAT IS USED ON TEMPLATES WANTING TO USE THE FILTER OPERATION
})
export class MealsFilterPipe implements PipeTransform {
  // GET THE CONTACTS LIST AND THE STRING TO USE WHEN FILTERING THE CONTACTS
  transform(meals: Meal[], term: string): any {
   let filteredMeals: Meal[] = [];  
    // CHECK IF THE CONTACTS LIST OR FILTER STRING IS EMPTY
   if (term && term.length > 0) {
      filteredMeals = meals.filter(
        (meal:Meal) => meal.name.toLowerCase().includes(term.toLowerCase())
      );
   }

   if (filteredMeals.length < 1){
      return meals;
   }

    return filteredMeals;
   }
}
