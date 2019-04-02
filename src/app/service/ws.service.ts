import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() {}

  ws: WebSocket;

  public connect(url) {
    this.ws = new WebSocket(url);
  }
}
