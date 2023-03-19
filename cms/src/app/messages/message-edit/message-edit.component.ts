import { Component, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender = '641083a19c3b419e51471bcd';

  // GET ELEMENTS DIRECTLY FROM THE TEMPLATE USING @viewChild
  @ViewChild('subject', {static: true}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  // GET THE CONTACTS SERVICE
  constructor(private messageService: MessageService) { }

  // FUNCTION TO SEND THE MESSAGE AFTER CREATING A NEW MESSAGE OBJECT USING USER DATA
  onSendMessage() {
    const subject =  this.subjectRef.nativeElement.value;
    const message = this.msgTextRef.nativeElement.value;
    const newMessage =  new Message('', subject, message, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  // FUNCTION TO CLEAR THE MESSAGE
  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

}
