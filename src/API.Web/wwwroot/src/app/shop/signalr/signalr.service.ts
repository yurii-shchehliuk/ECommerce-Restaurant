import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: any;

  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7023/feed").build();

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

  constructor() { }
}
