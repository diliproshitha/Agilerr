import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-viewsprint',
  templateUrl: './viewsprint.component.html',
  styleUrls: ['./viewsprint.component.css']
})
export class ViewsprintComponent implements OnInit {

  id: String;
  name: String;
  ids: any;
  userStories: any;
  sprint: any;
  date: String;
  finished: boolean = false;

  //is member a master
  isMaster: boolean;

  constructor(
    private dashService: DashService,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
    ) {
    this.id = localStorage.getItem('currentSprint');
    this.isMaster = this.authService.isMaster();
  }

  ngOnInit() {
    this.dashService.loadSprint(this.id).subscribe(sprint => {
      console.log(sprint);
      this.name = sprint[0].name;
      this.date = sprint[0].date;
      this.ids = sprint[0].ids;
      this.finished = sprint[0].finished;
      this.userStories = sprint[0].userStories;
    }, err => {
      console.log(err);
    });
  }

  finishSprint() {
    this.dashService.finishSprint(this.id).subscribe(data => {
      if (data.success) {
        this.finished = true;
        this.flashMessages.show('Sprint Marked as Finished!', {cssClass: 'alert-success', timeout: 3000})
      } else {
        this.flashMessages.show('Something went wrong!', {cssClass: 'alert-success', timeout: 3000})
      }
    });
  }

}
