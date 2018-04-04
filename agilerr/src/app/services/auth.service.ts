import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).
      map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).
    map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('type', user.type);
    localStorage.setItem('name', user.name);
    localStorage.setItem('id', user.id);
    this.authToken = token;
    this.user = user;
  }

  onLogOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers}).
    map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isLoggedIn() {
    return tokenNotExpired('id_token');
  }

  // Check if user is a master or not
  isMaster() {
    return localStorage.getItem('type') === 'master' ? true : false;
  }

  // checks username
  checkUser(username) {
    let url = 'http://localhost:3000/users/checkuser?username=' + username;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers}).
    map(res => res.json());
  }

  checkEmail (email) {
    let url = 'http://localhost:3000/users/checkemail?email=' + email;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers}).
    map(res => res.json());
  }

}
