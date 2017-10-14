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
  members: String;
  splittedMembers: any;
  project = {};

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

  // Seperates usernames from textarea
  seperateMembers(memberString) {
    let re = /\s*,\s*/;
    this.splittedMembers = memberString.split(re);
  }

}
