import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Router, ActivatedRoute, Params} from '@angular/router';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  // @ViewChild('f') documentForm: NgForm;
  // originalDocument references the original, unedited version of the document.
  originalDocument: Document;
  // document references the edited version of the document displayed in the form. 
  document: Document;
  // editMode indicates whether an existing document is to be edited, or a new document is being created.
  editMode: boolean = false;
  // subscription: Subscription;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    // CHECK IF AN DOCUMENT ID IS PASSED TO KNOW IF WE EDITING OR ADDING A NEW DOCUMENT
    this.route.params.subscribe((params: Params) => { 
      const id = params['id'];
      // CHECK IF ANY DOCUMENT ID IS PASSED
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);

      if (!this.originalDocument) {
        return;
      }
      this.editMode = true;
      console.log("Edit mode is: "+ this.editMode);
      // copies originalDocument object and into this.document object - no reference passed
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      // Object.assign(this.document, originalDocument);
      //this.document = originalDocument.slice();
    })
  }

  // FUNCTION TO ADD AND UPDATE A DOCUMENT ITEM
  onSubmit(documentForm: NgForm) {
    // GET VALUES FROM FORM AND ASSIGN THEM
    let id = " ";
    let name = documentForm.value.name;
    let url = documentForm.value.url;
    let description = documentForm.value.description;
    if (!documentForm.value.description) {
      description = "Enter Course Description Here";
    }
    //CREATE NEW DOCUMENT USING THE DATA FROM THE USER 
    const newDocument = new Document(id,name,description, url, []);

    // this.document.id = " ";
    // this.document.name = documentForm.value.name;
    // this.document.url = documentForm.value.url;
    // this.document.name = documentForm.value.description;
    // // CREATE NEW DOCUMENT USING THE DATA FROM THE USER 
    // const newDocument = new Document(this.document.id, this.document.name,
    // this.document.url, this.document.description, " ");
    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    }
    else {
      this.documentService.addDocument(newDocument);
    }
    // GO BACK TO THE DOCUMENTS ONLY PAGE
    this.router.navigate(['/documents']);
  }

  onCancel() {
    // GO BACK TO THE DOCUMENTS ONLY PAGE
    this.router.navigate(['/documents']);
  }

}
