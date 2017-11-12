import { Component, OnInit } from '@angular/core';
import { DashService } from "../../services/dash.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-editsprint',
  templateUrl: './editsprint.component.html',
  styleUrls: ['./editsprint.component.css']
})
export class EditsprintComponent implements OnInit {

  id: String;
  name: String;
  finished: boolean;
  ids: any;
  userStories: any;
  sprint = {};

  isMaster: boolean;

  constructor(
    private dashService: DashService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) {
    this.id = localStorage.getItem('currentSprint');
    this.isMaster = this.authService.isMaster();
  }

  ngOnInit() {
    this.dashService.loadSprint(this.id).subscribe(sprint => {
      console.log(sprint);
      this.name = sprint[0].name;
      this.ids = sprint[0].ids;
      this.finished = sprint[0].finished;
      this.userStories = sprint[0].userStories;
    }, err => {
      console.log(err);
    });
  }

  addRows() {
    this.ids.push('');
    this.userStories.push('');
  }

  update() {
    this.sprint['sprintId'] = this.id;
    this.sprint['ids'] = this.ids;
    this.sprint['userStories'] = this.userStories;
    this.sprint['name'] = this.name;

    this.dashService.updateSprint(this.sprint).subscribe(data => {
      this.flashMessage.show('Your sprint created successfully!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/dashboard']);
    }, err => {
      this.flashMessage.show('Somethin went wrong!', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/updateSprint']);
    });
  }

  finishSprint() {
    this.dashService.finishSprint(this.id).subscribe(data => {
      if (data.success) {
        this.finished = true;
        this.flashMessage.show('Sprint Marked as Finished!', {cssClass: 'alert-success', timeout: 3000})
      } else {
        this.flashMessage.show('Something went wrong!', {cssClass: 'alert-success', timeout: 3000})
      }
    });
  }

}
