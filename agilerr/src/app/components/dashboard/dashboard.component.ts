import { Component, OnInit } from '@angular/core';
import {DashService} from '../../services/dash.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashService: DashService) { }

  ngOnInit() {
    if (this.dashService.isMaster()) {
      this.dashService.loadProjectsOfOwner().subscribe(projects => {
        console.log(projects);
      }, err => {
        console.log(err);
      });
    }
  }

}
