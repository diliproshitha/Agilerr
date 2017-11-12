import { Component, OnInit } from '@angular/core';
import {DashService} from "../../services/dash.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submitissue',
  templateUrl: './submitissue.component.html',
  styleUrls: ['./submitissue.component.css']
})
export class SubmitissueComponent implements OnInit {

  priority: String = 'Priority';
  issueType: String = 'Issue Type';
  description: String = '';
  issue = {};
  username: String;
  formattedDate: String;

  constructor(
    private dashService: DashService,
    private flashMessages: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {

    this.username = localStorage.getItem('username');
  }

  setPriority(priority) {
    this.priority = priority;
  }

  setIssueType(isseType) {
    this.issueType = isseType;
  }

  submitIssue() {
    this.issue['type'] = this.issueType;
    this.issue['priority'] = this.priority;
    this.issue['description'] = this.description;
    this.issue['username'] = this.username;
    this.issue['projectId'] = this.dashService.getProjectId();

    this.getFormattedDate();
    this.issue['date'] = this.formattedDate;

    //Parse issue object to dash service to submit
    this.dashService.submitIssue(this.issue).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Issue submitted successfully', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['issues']);
      } else {
        this.flashMessages.show('Something went wrong! Please Try again :(', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['submitIssue']);
      }
    });
  }

  //returns formatted date string
  getFormattedDate() {
    var d = new Date();
    this.formattedDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  }

}
