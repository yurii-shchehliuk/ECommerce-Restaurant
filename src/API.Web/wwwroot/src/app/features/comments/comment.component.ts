import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageVM } from '../models/MessageVM';
import { SignalRService } from '../signalr.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationDialogComponent } from '../dialogs/registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  groupMessages: MessageVM[] = [];
  message: MessageVM = {
    createdAt: new Date().toISOString(),
    messageBody: '',
    userName: '',
    groupName: '',
    id: ''
  };

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private signalrService: SignalRService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      this.message.groupName = map.get('id');
      if (this.message.groupName) {
        this.signalrService.startConnection(this.message.groupName).then(() => {
          this.signalrService.joinGroupFeed(this.message.groupName).then(() => {
            this.signalrService.listenToGroup();
            // add messages to display
            this.signalrService.groupMsgsObject$.subscribe((d: MessageVM) => {
              this.groupMessages.push(d);
            });

            this.signalrService.getMessages(this.message.groupName);
          }, (err) => {
            console.log(err);
          })
        })
      }
    });
    // this.openDialog();
  }

  sendMessage(): void {
    this.message.userName = localStorage.getItem('user_name');

    if (this.message.messageBody.length === 0)
      return;
    if (this.message.userName?.length !== 0) {
      var result = this.openDialog();
    }
    console.log(this.message);
  }

  private openDialog() {
    const dialogRef = this.dialog.open(RegistrationDialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);

      /// <todo>push to array only last comment.
      /// because currently array assigns with new comment the whole list
      /// </todo>
      this.groupMessages = [];

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
    });
  }
}
