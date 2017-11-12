import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from "@angular/router";

@Component({
  selector: 'app-createsprint',
  templateUrl: './createsprint.component.html',
  styleUrls: ['./createsprint.component.css']
})
export class CreatesprintComponent implements OnInit {

  project: any;
  ids = new Array();
  userStories = new Array();
  projectId: String;
  sprintName: String;

  idCount = 0;
  storyCount = 0;
  formattedDate: String;
  projectName: String;

  sprint = {};

  rows = [1, 2, 3];

  constructor(
    private dashService: DashService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    this.projectId = localStorage.getItem('currentProject');
    this.projectName = localStorage.getItem('projectName');
  }

  ngOnInit() {
  }

  createSprint() {
    this.sprint['projectId'] = this.projectId;
    this.sprint['ids'] = this.ids;
    this.sprint['userStories'] = this.userStories;
    this.sprint['name'] = this.sprintName;

    this.getFormattedDate();
    this.sprint['date'] = this.formattedDate;

    this.dashService.createSprint(this.sprint).subscribe(data => {
      this.flashMessage.show('Your sprint created successfully!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/sprints']);
    }, err => {
      this.flashMessage.show('Somethin went wrong!', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/createSprint']);
    });
  }

  getFormattedDate() {
    var d = new Date();
    this.formattedDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  }

  //Add Rows to table
  addRows() {

    let index = this.rows[this.rows.length - 1];
    this.rows.push(++index);

  }

}
