import { Component, OnInit } from '@angular/core';
import {DashService} from '../../services/dash.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  project = {};

  constructor(
    private dashService: DashService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.dashService.loadProject().subscribe(project => {
      console.log(project);
    });
  }

}