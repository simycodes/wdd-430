import { Directive, ElementRef, OnInit } from "@angular/core";

// THIS IS CUSTOM DIRECTIVE - ADDING [] IN ADVANCE  - IN TEMPLATE CAN OMIT THEM
@Directive ({
    selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective implements OnInit {
    // elementRef: ElementR GETS-INJECTS THE CURRENT ELEMENT IN WHICH THIS DIRECTIVE WILL
    // BE PLACED IN.THIS IS NOT BEST WAY THOUGH OF USING & IMPLEMENTING CUSTOM DIRECTIVES
    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        // CHANGING THE BACKGROUND COLOR OF THE ELEMENT THIS DIRECTIVE WILL BE PLACED IN
        this.elementRef.nativeElement.style.backgroundColor = 'yellow';
    }

}