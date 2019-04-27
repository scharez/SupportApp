import { Component, OnInit } from '@angular/core';
import {WsService} from '../../service/ws.service';
import {User} from '../../objects/app.User';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private wsService: WsService) { }

  message: string;
  receiveMessage: string;
  sender: string;
  chat: string;

  ws: WebSocket;

  storage: User = JSON.parse(localStorage.getItem('user'));

  ngOnInit() {

    this.chat = 'LOL';

    this.ws = this.wsService.websocket;

    this.ws.onmessage = (evt) => {

      console.log(evt.data);

      this.receiveMessage = evt.data.toString().split('!#!')[0];
      this.sender = evt.data.toString().split('!#!')[0];

      this.chat += this.receiveMessage.concat('<br>');

    };
  }

  sendMessage() {
    this.ws.send('{"type": "message", "sendFrom":' + '"' + this.storage.username + '", "sendTo": "stefan", "content":' + '"' + this.message + '"' + '}');
    this.chat += this.message + '<br>';
  }

}
