import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // INJECT THE ROUTER FOR REDIRECTING IN TS CODE
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLoadServer(id: number) {
    // SOME COMPLEX TS CODE - AFTER THIS CODE THEN REDIRECT TO ANOTHER PAGE
    // EXAMPLE FROM LOGIN PAGE TO ADMIN PAGE
    this.router.navigate(['/servers', id, 'edit'],{queryParams: {allowEdit: '1'}, fragment: 'loading'}); 
    // THIS IS A ABSOLUTE PATH,JUST ADDS /servers TO localhost:4200/
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

}
