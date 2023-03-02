import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  // contacts variable has datatype of an array of object of a Contact Model
  contacts: Contact[] = []; 
  private subscription: Subscription; // THIS WILL STORE A SUBSCRIPTION PROCESS
  // contactGroup: Contact[] = [];
  // GET THE CONTACTS SERVICE
  constructor(private contactService: ContactService) { }

  // USE CONTACT SERVICE TO INITIALIZE THE DOCUMENT-LIST COMPONENT ARRAY VARIABLE
  ngOnInit() {
    // INITIALIZING THE CONTACTS WITH DATA FROM THE SERVICE(FROM FILE OR DB)
    this.contacts = this.contactService.getContacts();

    // SUBSCRIBING TO THE SUBJECT OBSERVABLE FROM THE DOCUMENT SERVICE
    // CHANGE THE LIST OF CONTACTS IN CASE OF ANY CONTACT BEING DELETED-UPDATED-ADDED
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contactsList: Contact[]) => {
        this.contacts = contactsList;
      })
    // USING THE EMITTER FOR SAME FUNCTIONALITY AS SUBJECT ABOVE
    // this.contactService.contactChangedEvent.subscribe((contacts: Contact[])=> {
    //   this.contacts = contacts;
    // })
  }

  //UNSUBSCRIBING FROM THE SUBJECT OBSERVABLE
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
