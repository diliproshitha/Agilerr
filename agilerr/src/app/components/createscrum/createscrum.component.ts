import {Component, OnInit, ViewChild} from '@angular/core';
import { DashService } from "../../services/dash.service";

@Component({
  selector: 'app-createscrum',
  templateUrl: './createscrum.component.html',
  styleUrls: ['./createscrum.component.css']
})
export class CreatescrumComponent implements OnInit {

  @ViewChild('myChart') myChart;

  constructor(private dashService: DashService) { }

  ngOnInit() {
  }

}
