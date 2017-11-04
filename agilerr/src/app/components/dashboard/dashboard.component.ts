import {Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { AuthService } from '../../services/auth.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  projects: any;
  isMaster: boolean;

  constructor(
    private dashService: DashService,
    private authService: AuthService
  ) {
    this.dashService.loadProjects().subscribe(projects => {
      this.projects = projects;
      if (isNullOrUndefined(localStorage.getItem('currentProject'))){
        console.log(this.projects[0]);
      }
    }, err => {
      console.log(err);
    });

    this.isMaster = this.authService.isMaster();
  }

  ngOnInit() {

  }

  //Save project as current project when a project clicked
  projectClicked(item) {
    this.dashService.setCurrentProject(item);
    this.dashService.projectChanged.emit(this.dashService.getProjectId());
  }
}
