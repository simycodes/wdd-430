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
    this.http.get('http://localhost:3000/contacts')
    .subscribe((contacts: Contact[])=> {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
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
    for (const contact of this.contacts) {
        // console.log(contact);
      // GET A CONTACT FOR MESSAGE NAME FUNCTIONALITY
      if (contact._id == id || contact.id == id) {
        return contact;
      }
      // GET A CONTACT FOR CONTACT DETAIL PAGE-COMPONENT
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
  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    // make sure id of the new Document is empty
    contact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ message: string, contact: Contact }>(
      'http://localhost:3000/contacts', contact,{ headers: headers })
      .subscribe((responseData) => {
          // add new contact to documents
          console.log(responseData.contact);
          this.contacts.push(responseData.contact);
          this.contactListChangedEvent.next(this.contacts.slice())
        }
      );
  }

  // FUNCTION TO UPDATE A DOCUMENT
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    console.log(pos);
    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe((response: Response) => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
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
    console.log(pos);

    // delete from database -- String(contact.id))
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );

  }

}

// providedIn: 'root' is the easiest and most efficient way to provide services since 
// Angular 6. The service will be available application wide as a singleton with no need to
// add it to a module 's providers array