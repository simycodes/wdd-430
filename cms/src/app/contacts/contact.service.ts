import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

  constructor(private http: HttpClient) {
    // NEEDED TO MAKE MESSAGES HAVE A SENDER NAME ONCE CONTACTS LIST IS UPLOADED
    this.contacts = this.getContacts();

    this.maxContactId = this.getMaxId();
  }

  // FUNCTION TO RETURN/GIVE ALL CONTACTS TO ALL COMPONENTS
  getContacts() {
    // return this.documents.slice();
    this.http.get('https://wdd430-cms-7daa5-default-rtdb.firebaseio.com/contacts.json')
    .subscribe((contacts: Contact[])=> {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      // this.contacts.sort((a, b) => (a.name < b.name)? 1 : (a.name > b.name)? -1: 0);
      this.contacts.sort((a, b) => {
        if(a.name < b.name){
          return -1;
        }
        if(a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.contactListChangedEvent.next(this.contacts.slice());
    },
    (error: any) => {
      console.log(error);
    }
    )

    // NEEDED TO MAKE MESSAGES HAVE A SENDER NAME ONCE CONTACTS LIST IS UPLOADED
    return this.contacts.slice();
  }

  // FUNCTION TO STORE CONTACTS
  storeContacts() {
    let contacts = JSON.parse(JSON.stringify(this.contacts));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    this.http.put(
      'https://wdd430-cms-7daa5-default-rtdb.firebaseio.com/contacts.json',
      contacts,
      { headers }
    )
    .subscribe((response)=> {
      this.contactListChangedEvent.next(this.contacts.slice())
    },
    (error)=> {
      console.log(error.message);
    })
  }

  // FUNCTION TO FIND A SPECIFIC CONTACT IN ARRAY OF CONTACTS
  getContact(id: string): Contact {
    console.log("called");
    // this.getContacts();
    for (const contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    
    return null;
  }

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
    // UPDATE THE DATABASE AND DISPLAY OF DOCUMENTS SHOWING NEWLY ADDED DOCUMENT
    this.storeContacts();
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
    // UPDATE THE DATABASE AND DISPLAY OF DOCUMENTS SHOWING NEWLY ADDED DOCUMENT
    this.storeContacts();
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
    // UPDATE THE DATABASE AND DISPLAY OF DOCUMENTS SHOWING NEWLY ADDED DOCUMENT
    this.storeContacts();
  }

}

// providedIn: 'root' is the easiest and most efficient way to provide services since 
// Angular 6. The service will be available application wide as a singleton with no need to
// add it to a module 's providers array