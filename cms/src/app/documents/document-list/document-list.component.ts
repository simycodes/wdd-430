import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  // CREATE AN EVENT VARIABLE TO BE TRIGGERED/EMITTED WHEN A DOCUMENT IN THE LIST
  // IS SELECTED 
  @Output() selectedDocumentEvent =  new EventEmitter<Document>();

  // THIS EVENT HANDLER IS CALLED TO TRIGGER THE EVENT ABOVE WHEN A DOCUMENT(IN DOCUMENT LIST)
  // IS CLICKED ON (THIS IS A CUSTOM EVENT HANDLER)
  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  // ARRAY OF DOCUMENTS TO BE DISPLAYED IN THE DOCUMENTS LIST TEMPLATE
  documents: Document[] = [
    new Document( '1', 'WDD 430 - Full Stack Web Development', 'Learn how to develop modern web applications using the MEAN Stack',
    'www.fullstackdev.com', null),
   new Document( '1', 'WDD 431 - Web Services', 'Learn how to build modern web APIs',
    'www.webservices.com', null),
    new Document( '1', 'WDD 322 - Web Development-2', 'Learn how to develop websites using HTML, CSS and JS',
    'www.webdev.com', null),
    new Document( '1', 'WDD 110 - Introduction to Databases', 'Learn how to build SQL databases using modern techniques',
    'www.database.com', null),
  ];
}
