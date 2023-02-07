import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MessageVM } from '../chat/MessageVM';
import { SignalRService } from '../signalr.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  groupMessages: MessageVM[] = [];
  // $groupFeedSubject: Subscription | undefined;
  message: MessageVM = {
    createdAt: new Date().toISOString(),
    messageBody: '',
    userName: '',
    groupName: ''
  };

  constructor(
    private route: ActivatedRoute,
    private signalrService: SignalRService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      this.message.groupName = map.get('id');

      if (this.message.groupName) {
        this.signalrService.startConnection().then(() => {
          this.signalrService.joinGroupFeed(this.message.groupName).then(() => {
            this.signalrService.listenToGroup();
            this.signalrService.groupMsgsObject$.subscribe((d: MessageVM) => {
              console.log(d);
              this.groupMessages.push(d);
            });
          }, (err) => {
            console.log(err);
          })
        })
      }
    });

  }

  sendMessage(): void {
    this.message.userName = localStorage.getItem('user_name');

    if (this.message.userName.length === 0
      || this.message.messageBody.length === 0) {
      return;
    }

    this.signalrService.sendGroupMessage(this.message).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log('sendGroupMessage', err);
      },
      complete: () => {
        this.message.messageBody = '';
      }
    });
  }

  ngOnDestroy(): void {
    // this.$groupFeedSubject?.unsubscribe();
  }
}
