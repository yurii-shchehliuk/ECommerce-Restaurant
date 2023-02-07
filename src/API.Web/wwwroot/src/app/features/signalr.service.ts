import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { MessageVM } from 'src/app/features/chat/MessageVM';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  messageReceived = new EventEmitter<MessageVM>();
  baseUrl = environment.identityApi.api + 'Chat/send';

  private hubConnection: signalR.HubConnection;
  private receivedMessage: MessageVM;
  private $allMessages = new Subject<MessageVM>();
  private $groupMessages: Subject<MessageVM> = new Subject<MessageVM>();

  constructor(private http: HttpClient) {
  }

  sendMessage(message: MessageVM) {
    this.hubConnection
      .invoke('NewMessage', message)
      .catch((err) => console.error(err));
  }

  // Calls the controller method
  public broadcastMessage(msgDto: MessageVM) {
    console.log('msgDto', msgDto);

    this.http.post(this.baseUrl, msgDto, {}).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log('broadcast message', err);
      }
    }
    );
    // this.sendMessage(msgDto)
  }

  public get allMessagesObject$(): Observable<MessageVM> {
    return this.$allMessages.asObservable();
  }

  public get GroupMsgsObject$(): Observable<MessageVM> {
    return this.$groupMessages.asObservable();
  }

  public listenToAllMessages() {
    this.hubConnection.on('MessageReceived', (user, message, date) => {
      this.receivedMessage = {
        date: date,
        messageBody: message,
        userName: user,
        groupName: ''
      };
      this.$allMessages.next(this.receivedMessage);
    });
    this.hubConnection.onclose(async () => {
      await this.startConnection();
    });
  }

  public listenToGroupFeed() {
    (this.hubConnection).on("GetGroupMessages", (data: MessageVM) => {
      console.log(data);
      this.$groupMessages.next(data);
    });
  }

  public joinGroupFeed(groupName: string) {
    return new Promise((resolve, reject) => {
      (this.hubConnection)
        .invoke("RegisterForFeed", groupName)
        .then(() => {
          console.log("added to feed");
          return resolve(true);
        }, (err: any) => {
          console.log(err);
          return reject(err);
        });
    })
  }

  public startConnection() {
    return new Promise((resolve, reject) => {
      //build connection
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(environment.identityApi.chat).build();

      //start
      this.hubConnection.start()
        .then(() => {
          console.log("connection established");
          return resolve(true);
        })
        .catch((err: any) => {
          console.log("error occured" + err);
          reject(err);
        });
    });
  }
}
