import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from '../../shop/signalr/signal-r.service';
import { MessageVM } from './MessageVM';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messageList: MessageVM[] = [];
  message = new MessageVM();

  constructor(
    private signalRService: SignalRService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscribeToEvents();
  }

  addToInbox(obj: MessageVM) {
    const newObj = new MessageVM();
    newObj.userName = obj.userName;
    newObj.messageBody = obj.messageBody;
    newObj.date = Date.now().toString();
    console.log('addToInbox', newObj);

    this.messageList.push(newObj);

    console.log('MESSAGES', this.messageList);
  }

  sendMessage(): void {
    if (this.message) {
      this.message.userName = localStorage.getItem('user_name');
      if (
        this.message.userName.length === 0 ||
        this.message.messageBody.length === 0
      ) {
        window.alert('Both fields are required.');
        return;
      } else {
        this.signalRService.broadcastMessage(this.message); // Send the message via a service
      }
    }
    this.message.messageBody = '';
  }

  private subscribeToEvents() {
    this.signalRService
      .retrieveMappedObject()
      .subscribe((receivedObj: MessageVM) => {
        console.log(receivedObj, 'retrieveMappedObject');
        this.addToInbox(receivedObj);
      }); // calls the service method to get the new messages sent
  }
}
