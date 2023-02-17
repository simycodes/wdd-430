import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { Subscription } from 'rxjs';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // ARRAY OF DOCUMENTS TO BE DISPLAYED IN THE DOCUMENTS LIST TEMPLATE
  documents: Document[] = [];
  private subscription: Subscription; // THIS WILL STORE A SUBSCRIPTION PROCESS

  // GET THE DOCUMENTS SERVICE
  constructor(private documentService: DocumentService) { }

  // USE DOCUMENT SERVICE TO INITIALIZE THE DOCUMENT-LIST COMPONENT ARRAY VARIABLE
  ngOnInit() {
    // INITIALIZING THE DOCUMENTS WITH DATA FROM THE SERVICE(FROM FILE OR DB)
    this.documents = this.documentService.getDocuments();

    // SUBSCRIBING TO THE SUBJECT OBSERVABLE FROM THE DOCUMENT SERVICE
    // CHANGE THE LIST OF DOCUMENTS IN CASE OF ANY DOCUMENT BEING DELETED-UPDATED-ADDED
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
    })
    // USING THE EMITTER FOR SAME FUNCTIONALITY AS SUBJECT ABOVE
    // this.documentService.documentChangedEvent
    // .subscribe((documents: Document[])=> {
    //   this.documents = documents;
    // })
  }

  //UNSUBSCRIBING FROM THE SUBJECT OBSERVABLE
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
