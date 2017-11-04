import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';

@Component({
  selector: 'app-viewsprint',
  templateUrl: './viewsprint.component.html',
  styleUrls: ['./viewsprint.component.css']
})
export class ViewsprintComponent implements OnInit {

  id: String;
  name: String;
  ids: any;
  userStories: any;
  sprint: any;
  date: String;

  constructor(private dashService: DashService) {
    this.id = localStorage.getItem('currentSprint');
  }

  ngOnInit() {
    this.dashService.loadSprint(this.id).subscribe(sprint => {
      console.log(sprint);
      this.name = sprint[0].name;
      this.date = sprint[0].date;
      this.ids = sprint[0].ids;
      this.userStories = sprint[0].userStories;
    }, err => {
      console.log(err);
    });
  }

}
