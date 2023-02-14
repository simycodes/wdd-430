import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs'; // THIS IS AN OBSERVABLE LIB, USE THIS TO CREATE CUSTOM
// OBSERVABLES, BUT IF ONLY USING THE SUBSCRIBE METHOD, U MAY NOT DO THIS IMPORT

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // CREATING A SUBSCRIPTION VARIABLE - HELP IN PROCESS OF UNSUBSCRIBING TO AN OBSERVABLE
  private firstObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // CREATING AN OBSERVABLE
    // STORING THE SUBSCRIPTION IN A VARIABLE
    this.firstObservableSubscription = interval(1000).subscribe(count => {
      console.log(count);
    })
  }

  ngOnDestroy(): void {
    // UNSUBSCRIBING TO AN OBSERVABLE
    this.firstObservableSubscription.unsubscribe();
  }

}
