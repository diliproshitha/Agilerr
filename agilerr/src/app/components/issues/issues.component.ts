import { Component, OnInit } from '@angular/core';
import {DashService} from '../../services/dash.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues = new Array();
  error = 'error';
  projectName: String = localStorage.getItem('projectName');
  isIssueZero: boolean = false;

  constructor(private dashService: DashService) {
  }

  ngOnInit() {
    this.dashService.getIssues().subscribe(issues => {
      if (!issues.success) {
        console.log('No Projects found!');
      } else {
        this.issues = issues.issues;
        console.log(this.issues);
        if (this.issues.length > 0) {
          console.log(this.issues);
          this.isIssueZero = true;
          console.log('Issues are zero!');
        }
      }
    });
  }

  isError(type) {
    if (type === 'error') {
      return true;
    }
    return false;
  }

  setAsFixed(issueId) {
    console.log(issueId);
    this.dashService.setIssueAsFixed(issueId).subscribe(data => {
      console.log(data);
      if (data.success) {
        for (let i = 0; i < this.issues.length; i++) {
          if (this.issues[i]._id === issueId) {
            this.issues[i].fixed = true;
          }
        }
      }
    });
  }

}
