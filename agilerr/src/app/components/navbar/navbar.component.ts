import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Materialize from 'materialize-css';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.onLogOut();
    Materialize.toast('You are Logged out!', 4000);
    // this.flashMessages.show('You are Logged out!', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['']);
  }

}
