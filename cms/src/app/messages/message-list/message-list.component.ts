import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  // LIST OF MESSAGES TO BE DISPLAYED INSIDE EACH MESSAGE ITEM
  messages: Message[] = [];

  // GET THE CONTACTS SERVICE
  constructor(private messageService: MessageService) { }

  // USE CONTACT SERVICE TO INITIALIZE THE CONTACT COMPONENT ARRAY VARIABLE
  ngOnInit() {
    this.messages = this.messageService.getMessages();
    // DISPLAY NEW ARRAY-UPDATED OF MESSAGES LIST WITH ADDED INGREDIENT
    this.messageService.messageChangedEvent.
      subscribe((messages: Message[])=>{
      this.messages = messages;
    })
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
