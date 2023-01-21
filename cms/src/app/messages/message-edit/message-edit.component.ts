import { Component, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender = 'Simon Mule';

  // GET ELEMENTS DIRECTLY FROM THE TEMPLATE USING @viewChild
  @ViewChild('subject', {static: true}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  // FUNCTION TO SEND THE MESSAGE AFTER CREATING A NEW MESSAGE OBJECT USING USER DATA
  onSendMessage() {
    const subject =  this.subjectRef.nativeElement.value;
    const message = this.msgTextRef.nativeElement.value;
    const newMessage=  new Message('1', subject, message, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  // FUNCTION TO CLEAR THE MESSAGE
  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

}
