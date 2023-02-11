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
  // EMITTER TO SIGNAL DELETION SO CHANGES CAN BE MADE TO ACTUAL LIST OF DOCUMENTS
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    // INITIALIZE CLASS documents variable TO IMPORTED DOCUMENTS
    this.documents = MOCKDOCUMENTS;
   }

  // FUNCTION TO RETURN/GIVE ALL DOCUMENTS TO ALL COMPONENTS
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  // FUNCTION TO FIND A SPECIFIC DOCUMENT IN ARRAY OF CONTACTS
  getDocument(id: string) : Document {
    for (const document of this.documents) {
      if(document.id == id) {
         return document;
      }
    }
    return null;
  }

  // FUNCTION TO DELETE A DOCUMENT
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    // The splice() array method is called to remove the document at the 
    // specified index position from the array
    this.documents.splice(pos, 1);
    // We then emit the documentChangedEvent to signal that a change has been made to the
    // document list and pass it a copy of the document list stored in the DocumentService class.
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
