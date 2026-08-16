import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageVM } from '../models/MessageVM';
import { SignalRService } from '../signalr.service';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

/**
 * Product comments, delivered over the same hub as the chat.
 *
 * The group name is the product id: `ChatController.GroupMessage` persists the
 * comment and then broadcasts the whole thread back to the group, which is why this
 * replaces its list on each push rather than appending to it.
 */
@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    imports: [ReactiveFormsModule, FormsModule, RouterLink, DatePipe]
})
export class CommentComponent implements OnInit, OnDestroy {
  private signalR = inject(SignalRService);

  @Input() productId!: string;

  comments: MessageVM[] = [];
  draft = '';
  userName = '';

  private subscription = new Subscription();
  private incoming: MessageVM[] = [];

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';

    if (!this.productId) {
      return;
    }

    this.subscription.add(
      this.signalR.groupMsgsObject$.subscribe((message) => {
        this.incoming.push(message);
        // The server sends the thread one message at a time; publish the batch once
        // the microtask that delivered it has drained.
        queueMicrotask(() => {
          if (this.incoming.length) {
            this.comments = [...this.incoming];
            this.incoming = [];
          }
        });
      })
    );

    this.signalR
      .startConnection(this.productId)
      .then(() => this.signalR.joinGroupFeed(this.productId))
      .then(() => {
        this.signalR.listenToGroup();
        this.signalR.requestGroupHistory(this.productId);
      })
      .catch(() => undefined);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.productId) {
      this.signalR.leaveGroup(this.productId);
    }
  }

  send(): void {
    const body = this.draft.trim();
    if (!body || !this.userName) {
      return;
    }

    this.signalR
      .sendGroupMessage({
        id: '',
        groupName: this.productId,
        userName: this.userName,
        messageBody: body,
        createdAt: new Date().toISOString(),
      })
      .subscribe({ complete: () => (this.draft = '') });
  }
}
