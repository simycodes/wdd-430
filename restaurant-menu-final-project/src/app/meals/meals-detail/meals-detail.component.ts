import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';
import { ActivatedRoute,  Params, Router } from '@angular/router';

@Component({
  selector: 'app-meals-detail',
  templateUrl: './meals-detail.component.html',
  styleUrls: ['./meals-detail.component.css']
})
export class MealsDetailComponent implements OnInit {
  meal: Meal;
  id: string;

  // MAKE AN ACTIVATED ROUTE INSTANCE VARIABLE IN ORDER TO GET THE ID IN THE ROUTE
  // AND TO USE THE OBTAINED ID TO FETCH DATA
  constructor(private mealService: MealService, 
    private route: ActivatedRoute, private router: Router){}

    ngOnInit() {
      // GET THE ACTUAL PASSED ID FROM THE ROUTE
      this.route.params.subscribe((params: Params)=> {
        this.id = params['id'];
        // USE THE ID FROM ROUTE TO FETCH DATA TO DISPLAY FOR DETAILED DOCUMENT ITEM
        this.meal =  this.mealService.getMeal(this.id);
      })
    }

    // FUNCTION TO DELETE A DOCUMENT
    onDelete() {
      this.mealService.deleteMeal(this.meal);
      // route back to the '/documents' URL
      this.router.navigateByUrl('/meals');
      // this.router.navigate(['/documents'], {relativeTo: this.route});
    }
}
