import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { Router } from '@angular/router';
import { isNull } from 'util';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  @ViewChild('cs') cs: ElementRef;

  project = {};

  rows = [1, 2];

  projectName: String = '';
  desc: String = '';
  ids = new Array();
  description = new Array();
  time = new Array();
  members: String = '';
  membersArray = new Array();
  splittedMembers = [];
  splitted = new Array();
  suggestions = new Array();
  isSuggestionsOn: boolean = false;

  flag: boolean = true;

  constructor(
    private dashService: DashService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {

    this.dashService.loadProject().subscribe(project => {
      this.project = project.project[0];
      console.log(this.project);
      this.projectName = this.project['projectName'];
      this.desc = this.project['projectDesc'];
      this.ids = this.project['ids'];
      this.description = this.project['description'];
      this.time = this.project['time'];
      this.membersArray = this.project['members'];

      for (let members of this.membersArray) {
        if (members !== '') {
          this.members += members + ', ';
        }
      }
    });
  }

  hide() {
    this.cs.nativeElement.setAttribute('style', 'display: none');
  }

  show() {
    this.cs.nativeElement.setAttribute('style', 'display: block');
  }

  // Add Rows to table
  addRows() {

    let index = this.rows[this.rows.length - 1];
    this.rows.push(++index);

  }

  // Seperates usernames from textarea to send to server
  seperateMembers(memberString) {
    let re = /\s*,\s*/;
    this.splittedMembers = memberString.split(re);
  }

  // Suggest Members from database
  suggestMembers() {

    if (this.members === '') {
      this.splitted = [];
      this.suggestions = [];
      this.flag = false;
    }

    if (this.members !== '') {
      this.flag = true;
      this.splitted = this.members.split(', ');

      console.log(this.splitted);
    }

    this.dashService.suggestMembers(this.splitted[this.splitted.length - 1]).subscribe(data => {
      if (data.success) {
        if (data.users) {
          this.isSuggestionsOn = true;

          this.suggestions = [];

          for (let user of data.users) {
            if (this.isMember(user.type)) {
              this.suggestions.push(user);
            }
          }

          console.log(data.users);
          console.log(this.suggestions);
        }
      }
    });
  }

  // On select a autocomplete option
  onAutoCompleteClick(username) {

    this.membersArray.push(username);

    let memberSplitted = this.members.split(', ');
    let memberString = '';

    memberSplitted[memberSplitted.length - 1] = username;

    for (let i = 0; i < memberSplitted.length; i++) {
      memberString += memberSplitted[i] + ', ';
    }

    this.members = memberString;

    console.log(this.splitted);
    console.log(this.members);
  }

  // test weather user is member
  isMember(user) {
    if (user === 'member') {
      console.log('True');
      return true;
    }
    return false;
  }

  // Remove member
  removeMember(member, index) {
    this.members = this.members.replace(member + ', ', '');
    this.membersArray.splice(index, 1);
  }

  onUpdateSubmit() {

    if (!isNull(this.projectName) || !isNull(this.members)) {
      // Seprate usernames
      this.seperateMembers(this.members);

      this.project['id'] = localStorage.getItem('currentProject');
      this.project['projectName'] = this.projectName;
      this.project['owner'] = localStorage.getItem('username');
      this.project['members'] = this.splittedMembers;
      this.project['projectDesc'] = this.desc;
      this.project['ids'] = this.ids;
      this.project['description'] = this.description;
      this.project['time'] = this.time;

      console.log(JSON.stringify(this.project));

      this.dashService.updateProject(this.project).subscribe(data => {
        if (data.success) {
          this.flashMessages.show('Your project created successfully!', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessages.show('Somethin went wrong!', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/updateProject']);
        }
      });
    }
  }

}