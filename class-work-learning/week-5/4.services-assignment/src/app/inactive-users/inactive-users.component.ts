import { Component, OnInit} from '@angular/core';
import { UserService } from '../users.service';
 
@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  users:  string[];
  // GET THE SERVICE
  constructor(private userService: UserService){}

  // DO INITIALIZATIONS IN THIS METHOD - USING SERVICE METHOD TO INITIALIZE A CLASS VARIABLE
  ngOnInit(): void {
    this.users = this.userService.inactiveUsers;
  }

  onSetToActive(id: number){
    this.userService.setToActive(id);
  }
}
