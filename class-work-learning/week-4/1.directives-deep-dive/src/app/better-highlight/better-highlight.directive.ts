import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

// USING RENDER IS A BETTER APPROACH TO INTERACT WITH DOM
@Directive({
  selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit {
  // RENDER HELPS GET-CONNECT THE ELEMENT IN WHICH THIS DIRECTIVE WILL BE 
  // PLACED IN
  // private elRef: ElementRef IS THE ELEMENT THIS DIRECTIVE WILL BE PLACED IN

  // HostBinding('value') myValue; is exactly the same as [value]="myValue"
  @HostBinding('style:backgroundColor') backgroundColor: string = 'transparent';
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'blue');
  }

  // Decorator that declares a DOM event to listen for, and provides a handler 
  // method to run when that event occurs.
  // HostListener('click') myClick(){ } is exactly the same as (click)="myClick()"
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'pink');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
  }

}
