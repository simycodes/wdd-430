import { Component, Input } from '@angular/core';
import { Meal } from '../meal.model';

@Component({
  selector: 'app-meals-item',
  templateUrl: './meals-item.component.html',
  styleUrls: ['./meals-item.component.css']
})
export class MealsItemComponent {
  @Input() meal: Meal;
}
