import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[menuDropdown]'
})

export class DropdownDirective {
    // BIND AN ELEMENT COMPONENT INSIDE A DIRECTIVE USING 
    // HostBinding('value') myValue; is exactly the same as [value]="myValue" - Property binding
    @HostBinding('class.open') isOpen = false;

    // ADDING AN EVENT AND EVENT-HANDLER IN ONE EXPRESSION USING @HostListener() 
    // HostListener('click') myClick(){ } is exactly the same as (click)="myClick() - Event binding
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    // NOTE:
    // HostBinding('value') myValue; is exactly the same as [value]="myValue" And
    // HostListener('click') myClick(){ } is exactly the same as (click)="myClick()"
    // HostBinding and HostListener are written in directives and the other ones (...) and 
    // [..] are written inside templates (of components).
}