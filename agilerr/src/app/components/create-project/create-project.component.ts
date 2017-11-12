import { Component, OnInit } from '@angular/core';
import {isNull} from "util";
import { DashService } from '../../services/dash.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  projectname: String;
  //string in text field
  members: String;
  //splitted members to send to the server
  splittedMembers: any;
  project = {};
  ids = new Array();
  description = new Array();
  time = new Array();
  //suggestions received from server
  suggestions = new Array();
  isSuggestionsOn: boolean = false;
  splitted = new Array();

  rows = [1, 2];


  constructor(
    private dashService: DashService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onCreateSubmit() {

    if (!isNull(this.projectname) || !isNull(this.members)) {
      // Seprate usernames
      this.seperateMembers(this.members);

      this.project['projectName'] = this.projectname;
      this.project['owner'] = localStorage.getItem('username');
      this.project['members'] = this.splittedMembers;
      this.project['ids'] = this.ids;
      this.project['description'] = this.description;
      this.project['time'] = this.time;

      console.log(JSON.stringify(this.project));

      this.dashService.createProject(this.project).subscribe(data => {
        if (data.success){
          this.flashMessage.show('Your project created successfully!', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show('Somethin went wrong!', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/createProject']);
        }
      });
    }
  }

  //Add Rows to table
  addRows() {

    let index = this.rows[this.rows.length - 1];
    this.rows.push(++index);

  }

  // Seperates usernames from textarea
  seperateMembers(memberString) {
    let re = /\s*,\s*/;
    this.splittedMembers = memberString.split(re);
  }

  //Suggest Members from database
  suggestMembers() {



    if (this.members == '') {
      this.suggestions = [];
    }

    if (this.members !== '') {
      this.splitted = this.members.split(',');

      console.log(this.splitted);
    }

    this.dashService.suggestMembers(this.splitted[this.splitted.length - 1]).subscribe(data => {
      if (data.success) {
        if (data.users) {
          this.isSuggestionsOn = true;
          this.suggestions = data.users;
          console.log(data);
        }
      }
    });
  }

}
