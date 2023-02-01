import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  // ARRAY OF DOCUMENTS TO BE DISPLAYED IN THE DOCUMENTS LIST TEMPLATE
  documents: Document[] = [];

  // GET THE DOCUMENTS SERVICE
  constructor(private documentService: DocumentService) { }

  // USE DOCUMENT SERVICE TO INITIALIZE THE DOCUMENT-LIST COMPONENT ARRAY VARIABLE
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  // THIS EVENT HANDLER IS CALLED TO TRIGGER THE CONTACT SERVICE WHEN A CONTACT IS
  // CLICKED ON (THIS IS AN EVENT HANDLER)
  onSelected(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
