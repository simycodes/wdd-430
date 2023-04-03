// Import the interface Component from angular library - to use for making components for
// the web app
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Simy Restaurant!';
}
