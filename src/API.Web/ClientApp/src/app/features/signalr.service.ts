import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { MessageVM } from 'src/app/features/models/MessageVM';
import { environment } from 'src/environment';

/**
 * The browser half of API.Identity's ChatHub.
 *
 * Messages are *sent* over HTTP to `ChatController`, which relays them through the
 * hub; they arrive *back* over the socket. That split is the server's design, and
 * keeping it means a message is persisted by the controller before any client sees
 * it.
 */
@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection: HubConnection | null = null;
  private allMessages = new Subject<MessageVM>();
  private groupMessages = new Subject<MessageVM>();

  constructor(private http: HttpClient) {}

  get allMessagesObject$(): Observable<MessageVM> {
    return this.allMessages.asObservable();
  }

  get groupMsgsObject$(): Observable<MessageVM> {
    return this.groupMessages.asObservable();
  }

  get connected(): boolean {
    return this.hubConnection?.state === HubConnectionState.Connected;
  }

  sendMessage(message: MessageVM) {
    return this.http.post(`${environment.identityApi.api}Chat/send`, message);
  }

  sendGroupMessage(message: MessageVM) {
    return this.http.post(`${environment.identityApi.api}Chat/group`, message);
  }

  /**
   * Asks the hub to replay a group's history. The response arrives on the socket as
   * `GetGroupMessages`, not as the body of this request.
   */
  requestGroupHistory(groupId: string) {
    return this.http
      .get(`${environment.identityApi.api}Chat/groupId/`, {
        params: new HttpParams().append('groupId', groupId),
      })
      .subscribe({ error: () => undefined });
  }

  listenToAllMessages(): void {
    this.hubConnection?.on('AllMessages', (message: MessageVM) => this.allMessages.next(message));
  }

  listenToGroup(): void {
    this.hubConnection?.on('GetGroupMessages', (messages: MessageVM[]) =>
      (messages ?? []).forEach((message) => this.groupMessages.next(message))
    );
  }

  joinGroupFeed(groupName: string): Promise<void> {
    return this.hubConnection
      ? this.hubConnection.invoke('JoinToGroup', groupName)
      : Promise.reject(new Error('not connected'));
  }

  leaveGroup(groupName: string): void {
    this.hubConnection?.invoke('LeaveGroup', groupName);
  }

  /**
   * Reconnection is delegated to `withAutomaticReconnect`, which backs off between
   * attempts; a hand-rolled `onclose` timer reconnects without backoff and stacks a
   * fresh timer on every drop.
   */
  async startConnection(productId = ''): Promise<void> {
    if (this.connected) {
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.identityApi.chat}?productId=${productId}`)
      .withAutomaticReconnect()
      .configureLogging(environment.production ? LogLevel.Error : LogLevel.Information)
      .build();

    this.hubConnection.serverTimeoutInMilliseconds = 100_000;

    await this.hubConnection.start();
  }

  async stopConnection(): Promise<void> {
    await this.hubConnection?.stop();
    this.hubConnection = null;
  }
}
