import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // ARRAY OF DOCUMENTS TO BE DISPLAYED IN THE DOCUMENTS LIST TEMPLATE
  documents: Document[] = [];

  // GET THE DOCUMENTS SERVICE
  constructor(private documentService: DocumentService) { }

  // USE DOCUMENT SERVICE TO INITIALIZE THE DOCUMENT-LIST COMPONENT ARRAY VARIABLE
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    // CHANGE THE LIST OF DOCUMENTS IN CASE OF ANY DOCUMENT BEING DELETED-UPDATED-ADDED
    this.documentService.documentChangedEvent
    .subscribe((documents: Document[])=> {
      this.documents = documents;
    })
  }


}
