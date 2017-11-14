import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {DashService} from "../../services/dash.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // For Users and Projects count
  projectsCount = '';
  usersCount = '';


  constructor(
    private authService: AuthService,
    private dashService: DashService
    ) { }

  ngOnInit() {

    // For Users and Projects count
    this.dashService.getProjectsCount().subscribe(count => {
      this.projectsCount = count;
    });

    this.dashService.getUsersCount().subscribe(count => {
      this.usersCount = count;
    });
  }

}
