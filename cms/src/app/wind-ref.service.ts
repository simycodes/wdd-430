import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WindRefService {
  // getNativeWindow() method returns a single reference to the DOM window object. 
  // and contains useful functions to interact with the browser window.
  getNativeWindow() {
    return window;
  }

  constructor() { }
}
