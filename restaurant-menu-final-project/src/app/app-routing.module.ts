import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MealsComponent } from "./meals/meals.component";
import { MealsEditComponent } from "./meals/meals-edit/meals-edit.component";
import { MealsDetailComponent } from "./meals/meals-detail/meals-detail.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/meals', pathMatch: 'full'},
    {path: 'meals', component: MealsComponent, children: [
        { path: 'new', component: MealsEditComponent},
        { path: ':id', component: MealsDetailComponent },
        { path: ':id/edit', component: MealsEditComponent}, 
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}