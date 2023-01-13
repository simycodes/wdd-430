// Import the interface Component from angular library - to use for making components for
// the web app
import { Component } from '@angular/core';

// The interface component is used to link to be created component to i) 
// The html file the component/its variables will be displayed in (root html) on the browser,
// ii) the html file in which component will be directly used in,
// iii) The css file the component will will
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// After the interface is created, then the actual Component is created using
// class keyword then -NameOfComponent- . The component can hold initialized
// variables etc that can be used in connected html to show the component data
export class AppComponent {
  showSecret = false;
  username = '';
  logs = [];
  logs2 = [];

  clearUsername() {
    this.username = '';
  }

  onToggleDisplayDetails() {
    this.showSecret = !this.showSecret;
    this.logs.push(this.logs.length + 1);
    this.logs2.push(new Date);
  }
}

