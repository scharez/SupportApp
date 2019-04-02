import { Component, OnInit } from '@angular/core';
import {WsService} from '../service/ws.service';
import {User} from '../objects/app.User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private ws: WsService) { }

  ngOnInit() {

    // this.ws.connect('ws://localhost:8025/websockets/chat');

  }

  setUsername() {
    alert(this.user.username);
  }

  login() {

  }
}
