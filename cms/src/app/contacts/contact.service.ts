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
  // getContact(id: string): Contact {
  //   this.contacts.forEach(contact => {
  //     if (contact.id == id) {
  //       return contact;
  //     }
  //   })
  //   return null;
  // }

  

  

}

// providedIn: 'root' is the easiest and most efficient way to provide services since 
// Angular 6. The service will be available application wide as a singleton with no need to
// add it to a module 's providers array