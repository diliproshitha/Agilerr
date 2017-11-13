import {Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { AuthService } from '../../services/auth.service';
import { isNullOrUndefined } from 'util';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  projects: any;
  isMaster: boolean;
  isAvailable: boolean;

  classes = ['success', 'danger', 'primary', 'warning'];

  constructor(
    private dashService: DashService,
    private authService: AuthService,
    private router: Router
  ) {
    this.dashService.loadProjects().subscribe(projects => {

      // console.log(JSON.stringify(projects));

      if (projects) {
        this.projects = projects;
        this.isAvailable = true;
        console.log(this.projects);
      } else {
        this.isAvailable = false;
      }


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
    this.router.navigate(['/sprints']);

  }

  // Get Random classes
  getRandomClasses() {
    let x = Math.floor((Math.random() * 4) + 0);
    return this.classes[x];
  }
}
