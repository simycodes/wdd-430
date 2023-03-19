import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// GET THE LIST OF ALL DOCUMENTS 
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

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

  constructor(private http: HttpClient) {
    // INITIALIZE CLASS documents variable TO IMPORTED DOCUMENTS
    // this.documents = MOCKDOCUMENTS;
    // this.documents = this.getDocuments()
    this.maxDocumentId = this.getMaxId();
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

  // SORT DOCUMENTS AND SEND THEM TO THE DISPLAY
  sortAndSend(){
    this.documents.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice())
  }

  // FUNCTION TO RETURN/GIVE ALL DOCUMENTS TO ALL COMPONENTS
  getDocuments() {
    // return this.documents.slice();
    this.http.get('http://localhost:3000/documents')
    .subscribe((documents: Document[])=> {
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a, b) => (a.name < b.name)? 1 : (a.name > b.name)? -1: 0);
      this.documentListChangedEvent.next(this.documents.slice());
    },
    (error: any) => {
      console.log(error);
    }
    )
    // return this.documents.slice();
  }

  // FUNCTION TO STORE DOCUMENTS
  storeDocuments() {
      let documents = JSON.parse(JSON.stringify(this.documents));
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
      this.http.put(
        'https://wdd430-cms-7daa5-default-rtdb.firebaseio.com/documents.json',
        documents,
        { headers }
      )
    .subscribe((response)=> {
      this.documentListChangedEvent.next(this.documents.slice())
    },
    (error)=> {
      console.log(error.message);
    })
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

  // FUNCTION TO ADD A DOCUMENT
  addDocument(document: Document) {
    if (!document) {
      return;
    }
    // make sure id of the new Document is empty
    document.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ message: string, document: Document }>(
      'http://localhost:3000/documents', document,{ headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  // FUNCTION TO UPDATE A DOCUMENT
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  // FUNCTION TO DELETE A DOCUMENT
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
