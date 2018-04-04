import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DashService } from '../../services/dash.service';
import Materialize from 'materialize-css';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  user: Object;
  profilePic: String;
  projectsCount: String = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private dashService: DashService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.profilePic = profile.user.username + '.jpeg';
    },
      err => {
      console.log(err);
      return false;
      });

      this.dashService.loadProjects().subscribe(projects => {
        this.projectsCount = projects.length;
      });
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;

    console.log(this.fileInput.nativeElement);

    let nameParts = fileBrowser.files[0].name.split('.');

    let filename = localStorage.getItem('username') + '.' + nameParts[nameParts.length - 1];
    console.log(filename);

    // fileBrowser.files[0].setName(filename);
    console.log(fileBrowser.files[0].name);

    if(fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('profile', fileBrowser.files[0], localStorage.getItem('username'));
      formData.append('filename', filename);

      this.dashService.upload(formData).subscribe(res => {
        console.log(res);
        Materialize.toast('Upload Successful!', 4000, 'teal darken-2');
      });
    }
  }


}