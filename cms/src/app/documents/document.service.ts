import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
// GET THE LIST OF ALL DOCUMENTS 
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  // CREATE THE DOCUMENT SELECTED EVENT - TRIGGERS WHEN A DOCUMENT IN CONTACT LIST IS SELECTED
  documentSelectedEvent = new EventEmitter<Document>();
  
  constructor() {
    // INITIALIZE CLASS documents variable TO IMPORTED DOCUMENTS
    this.documents = MOCKDOCUMENTS;
   }

  // FUNCTION TO RETURN/GIVE ALL DOCUMENTS TO ALL COMPONENTS
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  // FUNCTION TO FIND A SPECIFIC DOCUMENT IN ARRAY OF CONTACTS
  getDocument(id: string): Document {
    this.documents.forEach(contact => {
      if (contact.id == id) {
        return contact;
      }
    })
    return null;
  }
}
