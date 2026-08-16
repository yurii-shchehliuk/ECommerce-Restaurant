import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageVM } from '../models/MessageVM';
import { SignalRService } from '../signalr.service';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [NgIf, RouterLink, NgFor, ReactiveFormsModule, FormsModule, IconComponent, DatePipe]
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: MessageVM[] = [];
  draft = '';
  userName = '';
  status: 'connecting' | 'connected' | 'failed' = 'connecting';

  private subscription = new Subscription();

  constructor(private signalR: SignalRService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';

    this.subscription.add(
      this.signalR.allMessagesObject$.subscribe((message) => this.messages.push(message))
    );

    this.signalR
      .startConnection()
      .then(() => {
        this.signalR.listenToAllMessages();
        this.status = 'connected';
      })
      .catch(() => (this.status = 'failed'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.signalR.stopConnection();
  }

  isMine(message: MessageVM): boolean {
    return !!this.userName && message.userName === this.userName;
  }

  send(): void {
    const body = this.draft.trim();
    if (!body || this.status !== 'connected') {
      return;
    }

    const message: MessageVM = {
      id: '',
      groupName: '',
      userName: this.userName,
      messageBody: body,
      createdAt: new Date().toISOString(),
    };

    this.signalR.sendMessage(message).subscribe({ complete: () => (this.draft = '') });
  }
}
