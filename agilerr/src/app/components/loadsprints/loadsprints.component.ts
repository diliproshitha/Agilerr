import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-loadsprints',
  templateUrl: './loadsprints.component.html',
  styleUrls: ['./loadsprints.component.css']
})
export class LoadsprintsComponent implements OnInit {

  sprints: any;
  isMaster: boolean;
  isAvailable: boolean;
  classes = ['success', 'danger', 'primary', 'warning'];
  projectName: String;

  projectId: String;

  isLastFinished: boolean = false;

  constructor(
    private dashService: DashService,
    private router: Router,
    private authService: AuthService
    ) {
    this.dashService.projectChanged.subscribe(
      (projectId: String) => this.onProjectChange(projectId));
  }

  ngOnInit() {

    this.isMaster = this.authService.isMaster();
    this.projectName = localStorage.getItem('projectName');

    this.dashService.loadSprints(this.dashService.getProjectId()).subscribe(sprints => {

      if (sprints) {
        this.sprints = sprints;
        this.isAvailable = true;

        console.log(this.sprints[this.sprints.length - 1].finished);

        if (!this.sprints[this.sprints.length - 1].finished) {
          this.isLastFinished = true;
        }

      } else {
        this.isAvailable = false;
      }
    }, err => {
      console.log(err);
    });
  }

  onProjectChange(id) {
    this.dashService.loadSprints(id).subscribe(sprints => {
      this.sprints = sprints;
    }, err => {
      console.log(err);
    });
  }

  // View sprint Button
  viewClicked(id) {
     localStorage.setItem('currentSprint', id);
     this.router.navigate(['/viewSprint']);
  }

  //Edit sprint button
  editClicked(id) {
    localStorage.setItem('currentSprint', id);
    this.router.navigate(['/editSprint']);
  }

  // Get Random classes
  getColor(sprint) {
    if (sprint.finished) {
      return 'danger';
    } else {
      return 'success';
    }
  }

}
