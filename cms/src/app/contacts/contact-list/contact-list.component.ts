import { Component, Output, EventEmitter, OnInit, } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // contacts variable has datatype of an array of object of a Contact Model
  contacts: Contact[] = []; 

  // GET THE CONTACTS SERVICE
  constructor(private contactService: ContactService) { }

  // USE CONTACT SERVICE TO INITIALIZE THE DOCUMENT-LIST COMPONENT ARRAY VARIABLE
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    // CHANGE THE LIST OF CONTACTS IN CASE OF ANY CONTACT BEING DELETED-UPDATED-ADDED
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[])=> {
      this.contacts = contacts;
    })
  }
  
}
