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

  createNewFields() {

    // var input1 = document.createElement('input');
    // input1.setAttribute('type', 'text');
    // input1.setAttribute('class', 'form-control');
    // input1.setAttribute('style', 'width: 200px');
    //
    // var th = document.createElement('th');
    // th.setAttribute('style', 'width: 25%');
    // th.setAttribute('scope', 'row');
    //
    // th.appendChild(input1);
    //
    // var input2 = document.createElement('input');
    // input2.setAttribute('type', 'text');
    // input2.setAttribute('class', 'form-control');
    // input2.setAttribute('(focus)', 'createNewFields()');
    //
    // var td = document.createElement('td');
    // td.appendChild(input2);
    //
    // var tr = document.createElement('tr');
    // tr.appendChild(th);
    // tr.appendChild(td);
    //
    // document.getElementById('tbody').appendChild(tr);

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
      this.router.navigate(['/dashboard']);
    }, err => {
      this.flashMessage.show('Somethin went wrong!', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/createSprint']);
    });
  }

  getFormattedDate() {
    var d = new Date();
    this.formattedDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  }

}
