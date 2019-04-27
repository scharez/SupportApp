import { Component, OnInit } from '@angular/core';
import {WsService} from '../service/ws.service';
import {Message} from '../objects/app.Message';
import {User} from '../objects/app.User';

@Component({
  selector: 'app-chatarea',
  templateUrl: './chatarea.component.html',
  styleUrls: ['./chatarea.component.css']
})
export class ChatareaComponent implements OnInit {

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
    this.ws.send('{"type": "message", "sendFrom":' + '"' + this.storage.username + '", "sendTo": "admin", "content":' + '"' + this.message + '"' + '}');
    this.chat += this.message + '<br>';
  }
}
