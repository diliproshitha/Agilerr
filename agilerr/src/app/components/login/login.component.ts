import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Materialize from 'materialize-css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        Materialize.toast('Your are now logged in!', 4000, 'light-green lighten-1');
        // this.flashMessages.show('You are now logged in!', {cssClass: 'alert-success', timeout: 5000});
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['dashboard']);
      } else {
        Materialize.toast('Your entered credintials wrong!', 4000, 'light-green lighten-1');
        // this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

}
