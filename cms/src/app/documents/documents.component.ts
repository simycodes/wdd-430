import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  selectedDocument: Document;

  // GET THE DOCUMENTS SERVICE
  constructor(private documentService: DocumentService) { }

  // USE DOCUMENT SERVICE TO INITIALIZE THE DOCUMENT-LIST COMPONENT ARRAY VARIABLE
  // LISTEN TO THE contactSelectedEvent CREATED IN THE ContactService
  ngOnInit() {
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
    });
  }
  // using subscribe() on event variables allows the process of getting the event listener
  // when it occurs.subscribe() function can take in an arrow function as an argument to
  // deal with the event data received
}
