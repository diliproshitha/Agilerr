import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { DashService } from '../../services/dash.service';
import {isNull} from "util";

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
  projectName: String;
  username: String;

  constructor(private dashService: DashService) {

    this.projectId = localStorage.getItem('currentProject');
    this.projectName = localStorage.getItem('projectName');
    this.username = localStorage.getItem('username');

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

        let msg = {msg: data.substring(data.indexOf(';') + 1),
          username: data.substring(data.indexOf(':') + 1, data.indexOf(';'))};

        if (msg.msg !== '') {
          this.msgs.push(msg);
        }


        setTimeout(this.scrollBottom(), 2000);

      }
    });
  }

  //scolls bottom after msg receive
  scrollBottom() {
    var chatter = document.getElementById('chatter');
    chatter.scrollTop = chatter.scrollHeight;
  }

  //Load msgs from Database
  loadChat() {
    this.dashService.loadChat(localStorage.getItem('currentProject')).subscribe(msgs => {
      this.msgs = msgs;
      var chatter = document.getElementById('chatter');
      chatter.scrollTop = chatter.scrollHeight;
    });
  }

  // Send msg with socket
  sendmsg() {
    if (this.text !== '') {
      let msg = localStorage.getItem('currentProject') + ':' +
        localStorage.getItem('username') + ';' + this.text;
      this.socket.emit('sendmsg', msg);
      this.text = '';
      var chatter = document.getElementById('chatter');
      chatter.scrollTop = chatter.scrollHeight;
    }
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
