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

  public get allMessagesObject$(): Observable<MessageVM> {
    return this.$allMessages.asObservable();
  }

  public get groupMsgsObject$(): Observable<MessageVM> {
    return this.$groupMessages.asObservable();
  }

  // Calls the controller method
  sendMessage(msgDto: MessageVM) {
    return this.http.post(this.baseUrl, msgDto);
  }

  // Calls the controller method
  sendGroupMessage(msgDto: MessageVM) {
    return this.http.post(environment.identityApi.api + 'Chat/group', msgDto);
  }

  public listenToAllMessages() {
    this.hubConnection.on('AllMessages', (user, message, date) => {
      this.receivedMessage = {
        createdAt: date,
        messageBody: message,
        userName: user,
        groupName: ''
      };
      this.$allMessages.next(this.receivedMessage);
    });
    this.hubConnection.onclose(async () => {
      setTimeout(await this.startConnection(), 5000)
    });
  }

  public listenToGroup() {
    (this.hubConnection).on("GetGroupMessages", (user, message, date, groupName) => {
      this.receivedMessage = {
        createdAt: date,
        messageBody: message,
        userName: user,
        groupName: groupName
      };
      this.$groupMessages.next(this.receivedMessage);
    });
    this.hubConnection.onclose(async () => {
      setTimeout(await this.startConnection(), 5000)
    });
  }

  public joinGroupFeed(groupName: string) {
    return new Promise((resolve, reject) => {
      (this.hubConnection)
        .invoke("JoinToGroup", groupName)
        .then(() => {
          console.log("added to feed");
          return resolve(true);
        }, (err: any) => {
          console.log(err);
          return reject(err);
        });
    })
  }

  public leaveGroup(group: string): void {
    this.hubConnection.invoke('LeaveGroup', group);
  }

  public async startConnection(): Promise<any> {
    return await new Promise(async (resolve, reject) => {
      //build connection
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(environment.identityApi.chat)
        .build();
      this.hubConnection.serverTimeoutInMilliseconds = 100000; //100sec
      //start
      await this.hubConnection.start()
        .then(() => {
          console.log("connection established", new Date().toISOString());
          return resolve(true);
        })
        .catch((err: any) => {
          console.log("error occured" + err);
          reject(err);
        });
    });
  }
}
