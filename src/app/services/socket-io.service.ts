import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket;

  constructor() {
    this.socket = io.default('http://localhost:3000');
  }
  
  // emit(eventName: string, data: any) {
  //   this.socket.emit(eventName, data);
  // }
}
