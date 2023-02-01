import { Component} from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  selectedContact: Contact;

  // GET THE CONTACTS SERVICE
  constructor(private contactService: ContactService) { }

  // LISTEN TO THE contactSelectedEvent CREATED IN THE ContactService
  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
  // using subscribe() on event variables allows the process of getting the event listener
  // when it occurs.subscribe() function can take in an arrow function as an argument to
  // deal with the event data received
}
