import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  public sendMessage(message,user) {
    this.socket.emit('new-message', {user: user,message:message});
  }
  public addUser(user) {
    this.socket.emit('new-user', user);
  }
  public getAllUsers = () => {
    return Observable.create((observer) => {
      this.socket.on('new-user', (user) => {
          observer.next(user);
      });
    });
  }
  public getMessages = () => {
    return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
    });
}
}
