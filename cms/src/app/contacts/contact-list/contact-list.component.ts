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

  // USE CONTACT SERVICE TO INITIALIZE THE CONTACT COMPONENT ARRAY VARIABLE
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  // THIS EVENT HANDLER IS CALLED TO TRIGGER THE CONTACT SERVICE WHEN A CONTACT IS
  // CLICKED ON (THIS IS AN EVENT HANDLER)
  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
  
}
