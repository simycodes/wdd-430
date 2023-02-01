import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  // COUNT HOW MANY TIMES active to inactive has be clicked AND DISPLAY THIS NUMBER
  incrementActiveToInactiveCounter(){
    this.activeToInactiveCounter++;
    console.log('Active to Inactive is: ' + this.activeToInactiveCounter);
  }

  // COUNT HOW MANY TIMES inactive to active has be clicked AND DISPLAY THIS NUMBER
  incrementInactiveToActiveCounter(){
    this.inactiveToActiveCounter++
    console.log('Inactive to Active is: ' + this.inactiveToActiveCounter);
  }
}