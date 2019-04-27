import { Component, OnInit } from '@angular/core';
import {WsService} from '../service/ws.service';
import {User} from '../objects/app.User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  password = '';

  ws: WebSocket;

  constructor(private wsService: WsService, private router: Router) { }

  ngOnInit() {
    this.ws = this.wsService.websocket;
  }

  login() {

    this.ws.send(
      '{"type": "login", "sendFrom": "", "sendTo": "", "content":' + '"' + this.user.username + '#!' + this.password + '"' + '}');
    this.ws.onmessage = (evt) => {

      this.user.username = evt.data.toString().split('#!')[0];
      this.user.role = evt.data.toString().split('#!')[1];

      localStorage.setItem('user', JSON.stringify(this.user));

      console.log(this.user);

      const storage: User = JSON.parse(localStorage.getItem('user'));

      if (storage.role === 'USER') {
        this.router.navigate(['chatarea']);
      } else if (storage.role === 'ADMIN') {
        this.router.navigate(['dashboard']);
      } else {
        alert('something went wrong!');
      }

    };



  }

}
