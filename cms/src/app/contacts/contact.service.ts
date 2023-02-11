import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
// GET THE LIST OF ALL CONTACTS 
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  // CREATE THE CONTACT SELECTED EVENT - TRIGGERS WHEN A CONTACT IN CONTACT LIST IS SELECTED
  contactSelectedEvent = new EventEmitter<Contact>();
  // EMITTER TO SIGNAL DELETION SO CHANGES CAN BE MADE TO ACTUAL LIST OF DOCUMENTS
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    // INITIALIZE CLASS contacts variable TO IMPORTED CONTACTS
    this.contacts = MOCKCONTACTS;
  }

  // FUNCTION TO RETURN/GIVE ALL CONTACTS TO ALL COMPONENTS
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // FUNCTION TO FIND A SPECIFIC CONTACT IN ARRAY OF CONTACTS
  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
  }
  
  // WORKING ALTERNATIVE CODE
  // getContact(id: string) : Contact{
  //   for (const contact of this.contacts) {
  //     if(contact.id == id) {
  //       console.log("found!")
  //        return contact;
  //     }
  //   }
  //   return null;
  // }
  
  // FUNCTION TO DELETE A CONTACT
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    // The splice() array method is called to remove the document at the 
    // specified index position from the array
    this.contacts.splice(pos, 1);
    // We then emit the contactChangedEvent to signal that a change has been made to the
    // contact list and pass it a copy of the contact list stored in the ContactService class.
    this.contactChangedEvent.emit(this.contacts.slice());
  }

}

// providedIn: 'root' is the easiest and most efficient way to provide services since 
// Angular 6. The service will be available application wide as a singleton with no need to
// add it to a module 's providers array