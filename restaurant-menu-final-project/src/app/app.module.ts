import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // needed for TS ,TS feature
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MealsDetailComponent } from './meals/meals-detail/meals-detail.component';
import { MealsEditComponent } from './meals/meals-edit/meals-edit.component';
import { MealsItemComponent } from './meals/meals-item/meals-item.component';
import { MealsListComponent } from './meals/meals-list/meals-list.component';
import { MealsComponent } from './meals/meals.component';

import { AppRoutingModule } from './app-routing.module';
import { MealsFilterPipe } from './meals/meals-filter.pipe';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    AppComponent,
    MealsDetailComponent,
    MealsEditComponent,
    MealsItemComponent,
    MealsListComponent,
    MealsComponent,
    MealsFilterPipe,
    HeaderComponent
  ],
  imports: [ // All angular sub modules to be used in app must be imported and indicated here
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
