import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMessage: string;
  messageList = [];
  message: string;
  username: string;
  joinedUsersArr = [];

  constructor(private chatService: ChatService,private socket: Socket) {
    this.username = prompt("Please tell your name: ");
    this.addUser();
  }
  addUser() {
    this.chatService.addUser(this.username);
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage,this.username);
    this.newMessage = '';
  }
  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
      this.chatService
      .getAllUsers()
      .subscribe((user: string) => {
        this.joinedUsersArr.push(user);
      });
  }
}