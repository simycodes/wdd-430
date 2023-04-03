import { Component} from '@angular/core';
import { Meal } from './meal.model';
import { MealService } from './meal.service';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent {
  selectedMeal: Meal;

  // GET THE CONTACTS SERVICE
  constructor(private mealService: MealService) { }

  // LISTEN TO THE contactSelectedEvent CREATED IN THE ContactService
  ngOnInit() {
    this.mealService.mealSelectedEvent.subscribe((meal: Meal) => {
      this.selectedMeal = meal;
    });
  }
}
