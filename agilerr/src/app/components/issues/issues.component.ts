import { Component, OnInit } from '@angular/core';
import {DashService} from "../../services/dash.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues = Array;
  error = 'error';
  projectName: String = localStorage.getItem('projectName');

  constructor(private dashService: DashService) { }

  ngOnInit() {
    this.dashService.getIssues().subscribe(issues => {
      if (!issues.success) {
        console.log('No Projects found!');
      } else {
        this.issues = issues.issues;
        console.log(this.issues);
      }
    });


  }

  isError(type) {
    if (type === 'error')
      return true;
    return false;
  }

  setAsFixed(issueId) {
    console.log(issueId);
    this.dashService.setIssueAsFixed(issueId).subscribe(data => {
      console.log(data);
      if (data.success) {
        for (let i = 0; i < this.issues.length; i++) {
          if (this.issues[i]._id == issueId) {
            this.issues[i].fixed = true;
          }
        }
      }
    });
  }

}
