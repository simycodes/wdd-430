import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
// GET THE LIST OF ALL MESSAGES 
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  
  constructor() {
    // INITIALIZE CLASS contacts variable TO IMPORTED CONTACTS
    this.messages = MOCKMESSAGES;
  }

  // FUNCTION TO RETURN/GIVE ALL CONTACTS(A COPY - SLICE() IS USED) TO ALL COMPONENTS
  getMessages(): Message[] {
    return this.messages.slice();
  }

  // FUNCTION TO ADD A NEW MESSAGE TO THE THE MESSAGE LIST
  addMessage(message: Message) {
    // CHANGE/ADD A NEW MESSAGE TO THE ACTUAL contacts ARRAY, NOT THE COPY
    this.messages.push(message);
    // SEND A COPY OF THE NEW MESSAGE ARRAY WITH NEW MESSAGE TO ALL COMPONENTS HAVING MESSAGE LIST
    this.messageChangedEvent.emit(this.messages.slice())
  }

   // // FUNCTION TO FIND A SPECIFIC CONTACT IN ARRAY OF CONTACTS
  // getMessage(id: string): Message {
  //   this.messages.forEach(contact => {
  //     if (contact.id == id) {
  //       return contact;
  //     }
  //   })
  //   return null;
  // }

}
