import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];

  // DEFINING THE AccountService OBJECT VARIABLE SERVICE
  constructor(private accountsService: AccountsService){}

  // INITIALIZE THE accounts VARIABLE TO THE IMPORTED SERVICE VARIABLE CLASS/OBJECT
  ngOnInit() {
    // THIS accounts ARRAY IS EXACT SAME ARRAY AS ONE IN accounts.service SINCE
    // INITIALIZATION IS DONE REFERENCE HERE - AN ARRAY IS JUST BEING REFERENCED HERE
    this.accounts = this.accountsService.accounts;
  }
}
