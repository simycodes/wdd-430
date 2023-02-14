import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs'; // THIS IS AN OBSERVABLE LIB, USE THIS TO CREATE CUSTOM
// OBSERVABLES, BUT IF ONLY USING THE SUBSCRIBE METHOD, U MAY NOT DO THIS IMPORT
import { map } from 'rxjs/operators';

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
    // const customIntervalObservable =  new Observable();
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      // observer IS WHAT IS RETURNED WHEN AN OBSERVABLE HAS BEEN CREATED
      setInterval(() => {
        observer.next(count); //next() HANDLES THA OBSERVABLE DATA
        if(count === 2) {
          observer.complete() // CONDITION TO COMPLETE AN OBSERVABLE
        }
        if(count > 3) {
          observer.error(new Error('Count is greater than 3 - user created error'))
        }
        count++;
      }, 1000);

    })

    // OPERATORS ARE USED ON THE DATA OF THE OBSERVABLE USING THE pipe() FUNCTION
    customIntervalObservable.pipe(map((data: number) => {
      return 'Round: ' + (data + 1);
    }));
    
    // SUBSCRIBE TO CUSTOM OBSERVABLE AND HANDLE IT USING THE 3 METHODS IT TAKES AS 
    // ARGUMENTS - data(maybe any name), error and complete
    customIntervalObservable.subscribe(data => {
      console.log(data); // HANDLING AN OBSERVABLE DATA
    }, error => {
      console.log(error);
      alert(error.message); // HANDLING AN OBSERVABLE ERROR - THIS STOPS THE OBSERVABLE ALSO BY DEFAULT
    }, () => {
      console.log('Observer has completed');
    })

    // BASIC OBSERVABLE
    // this.firstObservableSubscription = interval(1000).subscribe(count => {
    //   console.log('basic observable ' + count);
    // })

  }

  
  ngOnDestroy(): void {
    // UNSUBSCRIBING TO AN OBSERVABLE
    this.firstObservableSubscription.unsubscribe();
  }

}
