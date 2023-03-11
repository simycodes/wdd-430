import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
  // 'contactsFilter IS WHAT IS USED ON TEMPLATES WANTING TO USE THE FILTER OPERATION
})
export class ContactsFilterPipe implements PipeTransform {
  // GET THE CONTACTS LIST AND THE STRING TO USE WHEN FILTERING THE CONTACTS
  transform(contacts: Contact[], term: string): any {
   let filteredContacts: Contact[] = [];  
    // CHECK IF THE CONTACTS LIST OR FILTER STRING IS EMPTY
   if (term && term.length > 0) {
      filteredContacts = contacts.filter(
        (contact:Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
   }

   if (filteredContacts.length < 1){
      return contacts;
   }

    return filteredContacts;
   }

    // MY SOLUTION
    // const filteredContacts: Contact[] = [];
    // // CHECK IF THE CONTACTS LIST OR FILTER STRING IS EMPTY
    // if(contacts.length === 0 || term === "") {
    //   return contacts;
    // }

    // // DO THE FILTERING
    // for(const contact of filteredContacts) {
    //   if(contact.name === term) {
    //     filteredContacts.push(contact);
    //   }
    // }

    // // CHECK IF THE FILTERED LIST HAS SOME DATA
    // if(filteredContacts.length === 0) {
    //   return contacts;
    // }

    // return filteredContacts;
    // }

}
