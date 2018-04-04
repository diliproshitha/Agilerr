import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbacklog',
  templateUrl: './viewbacklog.component.html',
  styleUrls: ['./viewbacklog.component.css']
})
export class ViewbacklogComponent implements OnInit {

  projectName: String = '';
  project = {};
  ids = [];
  desc = [];
  time = [];

  constructor(
    private dashService: DashService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projectName = localStorage.getItem('projectName');

    this.dashService.loadProject().subscribe(project => {
      this.project = project.project;
      this.ids = this.project[0].ids;
      this.desc = this.project[0].description;
      this.time = this.project[0].time;
      console.log(this.time);
      console.log(this.desc);
      console.log(this.ids);
    });
  }

}