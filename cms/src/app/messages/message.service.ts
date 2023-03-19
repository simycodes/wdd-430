import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
// GET THE LIST OF ALL MESSAGES 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactService } from '../contacts/contact.service';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  private maxMessageId: number;
  
  constructor(private http: HttpClient) {
    // this.messages = this.getMessages()
    this.maxMessageId = this.getMaxId();
  }

  // FUNCTION TO FIND THE MAX ID OF IN THE CURRENT MESSAGE LIST
  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // FUNCTION TO RETURN/GIVE ALL CONTACTS(A COPY - SLICE() IS USED) TO ALL COMPONENTS
  getMessages() {
    // return this.messages.slice();
    this.http.get('http://localhost:3000/messages')
    .subscribe((messages: Message[])=> {
      this.messages = messages;
      console.log(this.messages);
      this.maxMessageId = this.getMaxId();
      this.messages.sort((a, b) => (a.id < b.id)? 1 : (a.id > b.id)? -1: 0);
      this.messageChangedEvent.next(this.messages.slice());
    },
    (error: any) => {
      console.log(error);
    }
    )
    // return this.messages.slice();
  }

  // FUNCTION TO STORE DOCUMENTS
  storeMessages() {
      let messages = JSON.parse(JSON.stringify(this.messages));
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
      this.http.put(
        'https://wdd430-cms-7daa5-default-rtdb.firebaseio.com/messages.json',
        messages,
        { headers }
      )
    .subscribe((response)=> {
      this.messageChangedEvent.next(this.messages.slice())
    },
    (error)=> {
      console.log(error.message);
    })
  }

  // FUNCTION TO ADD A NEW MESSAGE TO THE THE MESSAGE LIST
  addMessage(message: Message) {
    if (!message) {
      return;
    }
    // make sure id of the new message is empty
    message.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ subject: string, message: Message }>(
      'http://localhost:3000/messages', message,{ headers: headers })
      .subscribe((responseData) => {
          // add new message to messages list
          this.messages.push(responseData.message);
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

}
