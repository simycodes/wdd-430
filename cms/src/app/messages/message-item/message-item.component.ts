import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSenderName: string;
  private subscription: Subscription; 

  // GET THE CONTACTS SERVICE
  constructor(private contactService: ContactService) { }

  // USE getContact() OF CONTACT SERVICE TO GET NAME OF MESSAGE SENDER USING
  // THE MESSAGE FROM ID TO GET A GIVEN CONTACT AND THEN GET NAME FROM THAT CONTACT
  ngOnInit() {
    // console.log(this.message.sender);
    let contact: Contact = this.contactService.getContact(this.message.sender);
    // console.log(contact);
    this.messageSenderName = contact?.name ?? "loading name...";
    // MAKE A SUBSCRIPTION TO THE CONTACT SERVICE TO ENSURE THAT THE MESSAGE
    // NAMES ARE UPDATED ACCORDING THEIR CORRESPONDING CONTACT NAMES
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(() => {
        contact = this.contactService.getContact(this.message.sender);
        this.messageSenderName = contact?.name ?? "loading name...";
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
