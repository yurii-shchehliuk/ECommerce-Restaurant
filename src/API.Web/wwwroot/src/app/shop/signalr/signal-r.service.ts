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
  private receivedMessage: MessageVM = new MessageVM();
  private sharedObj = new Subject<MessageVM>();
  private messageDTO = new MessageVM();

  constructor(private http: HttpClient) {
    this.buildConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message: MessageVM) {
    this.messageDTO = message;
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

  public retrieveMappedObject(): Observable<MessageVM> {
    return this.sharedObj.asObservable();
  }

  private buildConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.identityApi.chat)
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
      })
      .catch((err) => {
        console.log('Error while starting connection:' + err);
        setTimeout(() => {
          this.RetryConnection();
        }, 1000);
      });
  }

  private RetryConnection() {
    // this.startConnection();
  }

  private registerOnServerEvents() {
    this.hubConnection.on('MessageReceived', (user, message, date) => {
      this.mapReceivedMessage(user, message, date);

    });
    this.hubConnection.onclose(async () => {
      await this.startConnection();
    });
  }

  private mapReceivedMessage(user: string, message: string, date: string): void {
    this.receivedMessage.userName = user;
    this.receivedMessage.messageBody = message;
    this.receivedMessage.date = date;
    console.log('mapReceivedMessage', date);

    this.sharedObj.next(this.receivedMessage);
  }
}
