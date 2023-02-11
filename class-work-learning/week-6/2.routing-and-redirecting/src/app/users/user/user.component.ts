import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // OBJECT VARIABLE THAT WILL RECEIVE PARAMS PASSED TO THIS COMPONENT
  user: {id: number, name: string};

  // USING PARAMETERS IN THE ROUTES - INJECT ACTIVATED ROUTE TO GET DETAILS OF PARAMS PASSED
  // The activatedRoute object injected in a component gives that component access to 
  // the id param passed to it in the URL
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    }
    // SUBSCRIBING TO PARAMS MAKES THIS USER COMPONENT TO CHANGE ITS CONTENT DETAILS
    // WHENEVER THE URL ROUTE CHANGES - PARAMS IS AN OBSERVABLE-LISTENS TO ASYNC PROCESSES
    this.route.params.subscribe((params: Params)=> {
      this.user.id = params['id'];
      this.user.name =  params['name'];
    })
  }

}
