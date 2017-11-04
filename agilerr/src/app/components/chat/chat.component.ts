import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { DashService } from '../../services/dash.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  socket: any;
  text = ''; //get chat box text
  msgs = new Array();
  projectId: String;

  constructor(private dashService: DashService) {

    this.projectId = localStorage.getItem('currentProject');

    //Event emitter
    this.dashService.projectChanged.subscribe(
      (projectId: String) => this.onProjectChange(projectId));

    //init socketio
    this.loadSocket();

    // Load previous chat msgs
    this.loadChat();

  }

  ngOnInit() {
  }

  // Create a new socket
  loadSocket() {
    this.socket = socketIo('http://localhost:3000');

    // receive msg under project Id
    this.socket.on(this.projectId, (data) => {
      if (data.substring(0, data.indexOf(':')) == localStorage.getItem('currentProject')) {
        console.log(data.substring(data.indexOf(';') + 1));
        console.log(data.substring(0, data.indexOf(':')));
        console.log(data.substring(data.indexOf(':') + 1, data.indexOf(';')));

        let msg = {msg: data.substring(data.indexOf(';') + 1),
          username: data.substring(data.indexOf(':') + 1, data.indexOf(';'))};
        console.log(JSON.stringify(msg));

        this.msgs.push(msg);
      }
    });
  }

  //Load msgs from Database
  loadChat() {
    this.dashService.loadChat(localStorage.getItem('currentProject')).subscribe(msgs => {
      console.log(JSON.stringify(msgs));
      this.msgs = msgs;
    });
  }

  // Send msg with socket
  sendmsg() {
    let msg = localStorage.getItem('currentProject') + ':' +
              localStorage.getItem('username') + ';' + this.text;
    this.socket.emit('sendmsg', msg);
    this.text = '';
  }

  //Loads chat when project changed
  onProjectChange(id) {

    // In each time project changed, socket disconnects and initializes a new one

    this.dashService.loadChat(id).subscribe(msgs => {

      // Disconnect current socket
      this.socket.disconnect();
      this.projectId = id;

      //Create a new socket with new projectId
      this.loadSocket();

      this.msgs = msgs;
    }, err => {
      console.log(err);
    });
  }
}
