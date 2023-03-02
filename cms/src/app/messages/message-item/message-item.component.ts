import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  // GET THE CONTACTS SERVICE
  constructor(private contactService: ContactService) { }

  // USE getContact() OF CONTACT SERVICE TO GET NAME OF MESSAGE SENDER USING
  // THE MESSAGE FROM ID TO GET A GIVEN CONTACT AND THEN GET NAME FROM THAT CONTACT
  ngOnInit() {
    // console.log(this.message);
    // console.log(this.message.sender);
    const contact: Contact = this.contactService.getContact(this.message.sender);
    // console.log(contact);
    this.messageSender = contact.name;
  }
}
