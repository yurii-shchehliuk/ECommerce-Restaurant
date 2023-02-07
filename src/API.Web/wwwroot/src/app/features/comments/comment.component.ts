import { Component, OnInit } from '@angular/core';
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

  $groupFeed: Observable<MessageVM>;
  groupMessages: MessageVM[] = [];
  $groupFeedSubject: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private signalrService: SignalRService) {
    this.$groupFeed = this.signalrService.GroupMsgsObject$;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      let groupName: any = map.get('id');
      if (groupName) {
        this.signalrService.startConnection().then(() => {
          this.signalrService.joinGroupFeed(groupName).then(() => {
            this.signalrService.listenToGroupFeed();
            this.$groupFeedSubject = this.$groupFeed.subscribe((d: MessageVM) => {
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

  ngOnDestroy(): void {
    this.$groupFeedSubject?.unsubscribe();
  }
}
