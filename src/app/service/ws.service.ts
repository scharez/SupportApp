import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() {}

  websocket: WebSocket = new WebSocket('ws://localhost:8025/websockets/chat');

}
