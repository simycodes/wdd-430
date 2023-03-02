import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
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
  // CREATING THE SUBJECT OBSERVABLE FROM rxjs
  // EMITTER TO SIGNAL DELETION SO CHANGES CAN BE MADE TO ACTUAL LIST OF DOCUMENTS
  documentListChangedEvent = new Subject<Document[]>();
  // documentChangedEvent = new EventEmitter<Document[]>(); // this will be deleted
  private maxDocumentId: number;

  constructor() {
    // INITIALIZE CLASS documents variable TO IMPORTED DOCUMENTS
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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

  // FUNCTION TO FIND THE MAX ID OF IN THE CURRENT DOCUMENT LIST
  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // FUNCTION TO ADD A DOCUMENT
  addDocument(newDocument: Document) {
    // check to see if an actual document was passed to the function
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString(); // newDocument.id GETS A String NOT a number
    this.documents.push(newDocument);
    
    // GET A COPY OF THE UPDATED DOCUMENTS LIST HAVING NEWLY ADDED DOCUMENT
    let documentsListClone = this.documents.slice();
    // SEND THE COPY/CLONE ARRAY OF DOCUMENTS LIST HAVING NEWLY ADDED DOCUMENT
    // documentListChangedEvent is emitted to signal that a change has been made
    // to the documents list by calling its next() function
    this.documentListChangedEvent.next(documentsListClone);
  }

  // FUNCTION TO UPDATE A DOCUMENT
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    // indexOf() gets the index position of the original document in the documents list
    let pos = this.documents.indexOf(originalDocument);
    console.log("THE INDEX POS IS " + pos);
    if (pos < 0) {
      return;
    }

    // ASSIGN ID OF NEW UPDATED DOCUMENT WITH ID OF OLD NOT UPDATED DOCUMENT 
    newDocument.id = originalDocument.id;
    // documents list is then updated by assigning newDocument to the position in the 
    // documents list where the originalDocument was found.
    this.documents[pos] = newDocument;
    console.log("DOCUMENT UPDATED")
    // GET A COPY OF THE UPDATED DOCUMENTS LIST HAVING NEWLY ADDED DOCUMENT
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  // FUNCTION TO DELETE A DOCUMENT
  deleteDocument(document: Document) {
    console.log(document);
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
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
    // this.documentListChangedEvent.next(this.documents.slice());
    // this.documentChangedEvent.emit(this.documents.slice());
  }
}
