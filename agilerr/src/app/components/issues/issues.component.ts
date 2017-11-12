import { Component, OnInit } from '@angular/core';
import {DashService} from "../../services/dash.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues = {};
  error = 'error';
  projectName: String = localStorage.getItem('projectName');

  constructor(private dashService: DashService) { }

  ngOnInit() {
    this.dashService.getIssues().subscribe(issues => {
      if (!issues.success) {
        console.log('No Projects found!');
      } else {
        this.issues = issues.issues;
      }
    });
  }

  isError(type) {
    if (type === 'error')
      return true;
    return false;
  }

}
