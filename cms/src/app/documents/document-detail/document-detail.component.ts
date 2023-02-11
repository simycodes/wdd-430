import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document; // THIS WILL HOLD THE FETCHED DETAILED DOCUMENT
  id: string; // THIS WILL BE USED TO HOLD THE PASSED ID OF THE DOCUMENT TO DISPLAY IN DETAIL
  nativeWindow: any;

  // MAKE AN ACTIVATED ROUTE INSTANCE VARIABLE IN ORDER TO GET THE ID IN THE ROUTE
  // AND TO USE THE OBTAINED ID TO FETCH DATA
  constructor(private documentService: DocumentService, 
    private route: ActivatedRoute, private router: Router,
    private windRefService: WindRefService){
      this.nativeWindow = windRefService.getNativeWindow();
    }

  ngOnInit() {
    // GET THE ACTUAL PASSED ID FROM THE ROUTE
    // const id = this.route.snapshot.params['id']; // THIS ONLY GETS ID ONCE
    this.route.params.subscribe((params: Params)=> {
      this.id = params['id'];
      // USE THE ID FROM ROUTE TO FETCH DATA TO DISPLAY FOR DETAILED DOCUMENT ITEM
      this.document =  this.documentService.getDocument(this.id);
    })
  }

  // FUNCTION TO OPEN THE SELECTED DOCUMENT IN A NEW WINDOW
  onView() {
    if(this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }

  // FUNCTION TO DELETE A DOCUMENT
  onDelete() {
    this.documentService.deleteDocument(this.document);
    // route back to the '/documents' URL
    this.router.navigate(['/documents']);
    // this.router.navigate(['/documents'], {relativeTo: this.route});
  }
}
