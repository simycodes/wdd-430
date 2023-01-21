import { Component, Output, EventEmitter, } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  // contacts variable has datatype of an array of object of a Contact Model
  contacts: Contact[] = [
    new Contact( '1', 'R. Kent Jackson', 'jacksonk@byui.edu','208-496-3771', 
    '../../assets/images/jacksonk.jpg', null),
    new Contact( '2', 'Rex Barzee', 'barzeer@byui.edu','208-496-3768', 
    '../../assets/images/barzeer.jpg', null),
  ]; 

  // CREATE AN EVENT VARIABLE TO BE TRIGGERED/EMITTED WHEN A CONTACT IN THE LIST
  // IS SELECTED - (THIS IS AN EVENT LIKE CLICK BUT ITS USER DEFINED)
  // When the end user clicks on a contact in the contact list, the selectedContactEvent
  // will be fired and send the emitted event back up to the parent ContactsComponent. 
  @Output() selectedContactEvent =  new EventEmitter<Contact>();

  // THIS EVENT HANDLER IS CALLED TO TRIGGER THE EVENT ABOVE WHEN A CONTACT IS
  // CLICKED ON (THIS IS AN EVENT HANDLER)
  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
  
}
