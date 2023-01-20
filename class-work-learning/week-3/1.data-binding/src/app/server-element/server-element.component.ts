import { Component, ContentChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  // Emulated - this is the default - each component with each styling 
})
export class ServerElementComponent {
  // @Input() element: { type: string, name: string, content: string} 
  // serverElement is alias name for element and will be used in other components when
  // accessing element property
  @Input('serverElement') element: { type: string, name: string, content: string}
  // @ContentChild('learningParagraph') paragraph: ElementRef;
}
