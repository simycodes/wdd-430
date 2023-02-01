import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UserService {
    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];

    // GET THE CounterService SERVICE (USING A SERVICE IN ANOTHER SERVICE)
    constructor(private counterService: CounterService) {}

    setToActive(id: number){
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1); // splice removes given element
        this.counterService.incrementActiveToInactiveCounter();
    }

    setToInactive(id: number){
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1); // splice removes given element
        this.counterService.incrementActiveToInactiveCounter();
    }

}