import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

// USING RENDER IS A BETTER APPROACH TO INTERACT WITH DOM
@Directive({
  selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit {
  // binding to directive properties
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  // @Input('appBetterHighligh') highlightColor: string = 'blue'; then in the template add
  // <p [appBetterHighlight] >Some text here</p>

  // 1.HostBinding('value') myValue; is exactly the same as [value]="myValue" BUT
  // placed in a directive and not on a template
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { 
  }
  ngOnInit() {
    this.backgroundColor = this.defaultColor
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

  // 2.HostListener('click') myClick(){ } is exactly the same as (click)="myClick()" BUT
  // placed in a directive and not on a template
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

   @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

  
  

 


 

}
