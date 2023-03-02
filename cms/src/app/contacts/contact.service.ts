import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
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
  
  // CREATING THE SUBJECT OBSERVABLE FROM rxjs
  // EMITTER TO SIGNAL DELETION SO CHANGES CAN BE MADE TO ACTUAL LIST OF CONTACTS
  contactListChangedEvent = new Subject<Contact[]>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  private maxContactId: number;

  constructor() {
    // INITIALIZE CLASS contacts variable TO IMPORTED CONTACTS
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  // FUNCTION TO RETURN/GIVE ALL CONTACTS TO ALL COMPONENTS
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // FUNCTION TO FIND A SPECIFIC CONTACT IN ARRAY OF CONTACTS
  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  }
  // WORKING ALTERNATIVE CODE
   // getContact(id: string): Contact {
  //   for (let contact of this.contacts) {
  //     if (contact.id == id) {
  //       return contact;
  //     }
  //   }
  // }
  
  // FUNCTION TO FIND THE MAX ID OF IN THE CURRENT DOCUMENT LIST
  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // FUNCTION TO ADD A DOCUMENT
  addContact(newContact: Contact) {
    // check to see if an actual document was passed to the function
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString(); // newDocument.id GETS A String NOT a number
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  // FUNCTION TO UPDATE A DOCUMENT
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
  
  // FUNCTION TO DELETE A CONTACT
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    // The splice() array method is called to remove the document at the specified index position from the array
    this.contacts.splice(pos, 1);
    // We then emit the contactChangedEvent to signal that a change has been made to the
    // contact list and pass it a copy of the contact list stored in the ContactService class.
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
    this.contactListChangedEvent.next(this.contacts.slice());
    //this.contactChangedEvent.emit(this.contacts.slice());
  }

}

// providedIn: 'root' is the easiest and most efficient way to provide services since 
// Angular 6. The service will be available application wide as a singleton with no need to
// add it to a module 's providers array