import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  // LIST OF MESSAGES  TO BE DISPLAYED INSIDE EACH MESSAGE ITEM
  messages: Message[] = [
    new Message( '1', 'First message', 'Hello! This is my first message',
    'Simon Mule'),
    new Message( '1', 'Second message', 'Hello! This is my second message',
    'Paul Mule'),
    new Message( '1', 'Third message', 'Hello! This is my third message',
    'Richard Voigt'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
